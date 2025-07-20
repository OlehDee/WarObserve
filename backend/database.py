from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import logging
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
        db_name = os.environ.get('DB_NAME', 'test_database')
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
    async def close_connection(self):
        self.client.close()

# Database instance
database = Database()

# Generic CRUD operations
class CRUDBase:
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        self.collection = database.db[collection_name]

    async def create(self, data: dict) -> dict:
        """Create a new document"""
        data['createdAt'] = datetime.utcnow()
        data['updatedAt'] = datetime.utcnow()
        
        # Ensure we have an 'id' field - use existing or generate UUID
        if 'id' not in data:
            import uuid
            data['id'] = str(uuid.uuid4())
        
        result = await self.collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return data

    async def get_by_id(self, doc_id: str) -> Optional[dict]:
        """Get document by ID"""
        # Try both 'id' and '_id' fields for compatibility
        doc = await self.collection.find_one({"id": doc_id})
        if not doc:
            # Try with ObjectId if it looks like one
            try:
                from bson import ObjectId
                if len(doc_id) == 24:  # MongoDB ObjectId length
                    doc = await self.collection.find_one({"_id": ObjectId(doc_id)})
            except:
                pass
        
        if doc:
            doc['id'] = doc.get('id', str(doc['_id']))
            doc['_id'] = str(doc['_id'])
        return doc

    async def get_all(self, 
                      filter_dict: dict = None, 
                      skip: int = 0, 
                      limit: int = 100,
                      sort_by: str = "_id",
                      sort_order: int = -1) -> List[dict]:
        """Get all documents with optional filtering and pagination"""
        if filter_dict is None:
            filter_dict = {}
            
        # Simple find without complex sorting first
        cursor = self.collection.find(filter_dict).skip(skip).limit(limit)
        
        docs = await cursor.to_list(length=limit)
        for doc in docs:
            # Ensure all docs have both id and _id fields
            doc['id'] = doc.get('id', str(doc['_id']))
            doc['_id'] = str(doc['_id'])
            
            # Convert datetime objects to ISO strings for JSON serialization
            for key, value in doc.items():
                if hasattr(value, 'isoformat'):  # Check if it's a datetime object
                    doc[key] = value.isoformat()
                    
        return docs

    async def count(self, filter_dict: dict = None) -> int:
        """Count documents with optional filtering"""
        if filter_dict is None:
            filter_dict = {}
        return await self.collection.count_documents(filter_dict)

    async def update(self, doc_id: str, update_data: dict) -> Optional[dict]:
        """Update document by ID"""
        update_data['updatedAt'] = datetime.utcnow()
        
        # Try to update by 'id' field first
        result = await self.collection.find_one_and_update(
            {"id": doc_id},
            {"$set": update_data},
            return_document=True
        )
        
        # If not found, try by ObjectId
        if not result:
            try:
                from bson import ObjectId
                if len(doc_id) == 24:  # MongoDB ObjectId length
                    result = await self.collection.find_one_and_update(
                        {"_id": ObjectId(doc_id)},
                        {"$set": update_data},
                        return_document=True
                    )
            except:
                pass
        
        if result:
            result['id'] = result.get('id', str(result['_id']))
            result['_id'] = str(result['_id'])
        return result

    async def delete(self, doc_id: str) -> bool:
        """Delete document by ID"""
        result = await self.collection.delete_one({"id": doc_id})
        return result.deleted_count > 0

    async def search(self, query: str, fields: List[str], 
                    skip: int = 0, limit: int = 100) -> List[dict]:
        """Search documents by text in specified fields"""
        search_conditions = []
        for field in fields:
            search_conditions.append({field: {"$regex": query, "$options": "i"}})
        
        filter_dict = {"$or": search_conditions} if search_conditions else {}
        
        cursor = self.collection.find(filter_dict)
        cursor = cursor.skip(skip).limit(limit)
        
        docs = await cursor.to_list(length=limit)
        for doc in docs:
            doc['_id'] = str(doc['_id'])
        return docs

# Collection-specific CRUD classes
class NewsArticlesCRUD(CRUDBase):
    def __init__(self):
        super().__init__("news_articles")

    async def get_published(self, skip: int = 0, limit: int = 100) -> List[dict]:
        """Get published articles only"""
        return await self.get_all(
            filter_dict={"status": "published"},
            skip=skip,
            limit=limit,
            sort_by="publishedDate"
        )

    async def get_by_category(self, category: str, skip: int = 0, limit: int = 100) -> List[dict]:
        """Get articles by category"""
        return await self.get_all(
            filter_dict={"category": category, "status": "published"},
            skip=skip,
            limit=limit,
            sort_by="publishedDate"
        )

class TeamMembersCRUD(CRUDBase):
    def __init__(self):
        super().__init__("team_members")

    async def get_active(self) -> List[dict]:
        """Get active team members only"""
        return await self.get_all(filter_dict={"isActive": True})

class ResearchProjectsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("research_projects")

    async def get_by_status(self, status: str) -> List[dict]:
        """Get projects by status"""
        return await self.get_all(filter_dict={"status": status})

class PartnersCRUD(CRUDBase):
    def __init__(self):
        super().__init__("partners")

    async def get_active(self) -> List[dict]:
        """Get active partners only"""
        return await self.get_all(filter_dict={"isActive": True})

class ResourcesCRUD(CRUDBase):
    def __init__(self):
        super().__init__("resources")

    async def increment_download_count(self, resource_id: str) -> Optional[dict]:
        """Increment download count for a resource"""
        result = await self.collection.find_one_and_update(
            {"id": resource_id},
            {"$inc": {"downloadCount": 1}, "$set": {"updatedAt": datetime.utcnow()}},
            return_document=True
        )
        if result:
            result['_id'] = str(result['_id'])
        return result

class JobOpeningsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("job_openings")

    async def get_active(self) -> List[dict]:
        """Get active job openings only"""
        current_date = datetime.utcnow()
        return await self.get_all(
            filter_dict={
                "isActive": True,
                "applicationDeadline": {"$gte": current_date}
            }
        )

class ContactSubmissionsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("contact_submissions")

class JobApplicationsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("job_applications")

    async def get_by_job(self, job_id: str) -> List[dict]:
        """Get applications for a specific job"""
        return await self.get_all(filter_dict={"jobId": job_id})

class TestimonialsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("testimonials")

    async def get_approved(self) -> List[dict]:
        """Get approved testimonials only"""
        return await self.get_all(filter_dict={"isApproved": True})

class FAQsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("faq")

    async def get_active(self) -> List[dict]:
        """Get active FAQs ordered by order field"""
        return await self.get_all(
            filter_dict={"isActive": True},
            sort_by="order",
            sort_order=1
        )

class DonationsCRUD(CRUDBase):
    def __init__(self):
        super().__init__("donations")

    async def get_by_status(self, status: str) -> List[dict]:
        """Get donations by status"""
        return await self.get_all(filter_dict={"status": status})

# Initialize CRUD instances
news_articles_crud = NewsArticlesCRUD()
team_members_crud = TeamMembersCRUD()
research_projects_crud = ResearchProjectsCRUD()
partners_crud = PartnersCRUD()
resources_crud = ResourcesCRUD()
job_openings_crud = JobOpeningsCRUD()
contact_submissions_crud = ContactSubmissionsCRUD()
job_applications_crud = JobApplicationsCRUD()
testimonials_crud = TestimonialsCRUD()
faqs_crud = FAQsCRUD()
donations_crud = DonationsCRUD()