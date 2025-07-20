from fastapi import FastAPI, APIRouter, HTTPException, Query, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
import asyncio

# Import our models and database
from models import *
from database import (
    news_articles_crud, team_members_crud, research_projects_crud,
    partners_crud, resources_crud, job_openings_crud, contact_submissions_crud,
    job_applications_crud, testimonials_crud, faqs_crud, donations_crud, database
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="War:Observe API",
    description="API for War:Observe NGO website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Utility function to convert datetime objects to strings for JSON serialization
def serialize_datetime_fields(data):
    """Convert datetime objects to ISO format strings in a document or list of documents"""
    if isinstance(data, list):
        for item in data:
            serialize_datetime_fields(item)
    elif isinstance(data, dict):
        for key, value in data.items():
            if hasattr(value, 'isoformat'):
                data[key] = value.isoformat()
    return data

# Helper function for pagination
def get_pagination_params(page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=100)):
    skip = (page - 1) * limit
    return skip, limit, page

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "War:Observe API v1.0.0", "status": "active"}

# News Articles Endpoints
@api_router.get("/news")
async def get_news_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None
):
    """Get published news articles with optional category filtering"""
    try:
        if category:
            articles = await news_articles_crud.get_by_category(category, skip, limit)
        else:
            articles = await news_articles_crud.get_all(skip=skip, limit=limit)  # Get all articles instead of just published
        return serialize_datetime_fields(articles)
    except Exception as e:
        logger.error(f"Error fetching news articles: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/news/{article_id}")
async def get_news_article(article_id: str):
    """Get a single news article by ID"""
    try:
        article = await news_articles_crud.get_by_id(article_id)
        if not article:
            raise HTTPException(status_code=404, detail="Article not found")
        return serialize_datetime_fields(article)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching article {article_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/news/category/{category}")
async def get_news_by_category(
    category: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """Get news articles by category"""
    try:
        articles = await news_articles_crud.get_by_category(category, skip, limit)
        return serialize_datetime_fields(articles)
    except Exception as e:
        logger.error(f"Error fetching articles by category {category}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Team Members Endpoints
@api_router.get("/team")
async def get_team_members():
    """Get all active team members"""
    try:
        members = await team_members_crud.get_all()
        return serialize_datetime_fields(members)
    except Exception as e:
        logger.error(f"Error fetching team members: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/team/{member_id}")
async def get_team_member(member_id: str):
    """Get a single team member by ID"""
    try:
        member = await team_members_crud.get_by_id(member_id)
        if not member:
            raise HTTPException(status_code=404, detail="Team member not found")
        return serialize_datetime_fields(member)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching team member {member_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Research Projects Endpoints
@api_router.get("/research")
async def get_research_projects():
    """Get all research projects"""
    try:
        projects = await research_projects_crud.get_all()
        return serialize_datetime_fields(projects)
    except Exception as e:
        logger.error(f"Error fetching research projects: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/research/{project_id}")
async def get_research_project(project_id: str):
    """Get a single research project by ID"""
    try:
        project = await research_projects_crud.get_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Research project not found")
        return serialize_datetime_fields(project)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching research project {project_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/research/status/{status}")
async def get_research_by_status(status: str):
    """Get research projects by status"""
    try:
        projects = await research_projects_crud.get_by_status(status)
        return serialize_datetime_fields(projects)
    except Exception as e:
        logger.error(f"Error fetching projects by status {status}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Partners Endpoints
@api_router.get("/partners")
async def get_partners():
    """Get all active partners"""
    try:
        partners = await partners_crud.get_all()
        return serialize_datetime_fields(partners)
    except Exception as e:
        logger.error(f"Error fetching partners: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Resources Endpoints
@api_router.get("/resources")
async def get_resources():
    """Get all resources"""
    try:
        resources = await resources_crud.get_all()
        return serialize_datetime_fields(resources)
    except Exception as e:
        logger.error(f"Error fetching resources: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/resources/download/{resource_id}")
async def download_resource(resource_id: str):
    """Increment download count and return download info"""
    try:
        resource = await resources_crud.increment_download_count(resource_id)
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        return {
            "success": True,
            "message": "Download count incremented",
            "downloadUrl": resource["downloadUrl"],
            "filename": resource["title"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing resource download {resource_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Job Openings Endpoints
@api_router.get("/jobs")
async def get_job_openings():
    """Get all active job openings"""
    try:
        jobs = await job_openings_crud.get_all()
        return serialize_datetime_fields(jobs)
    except Exception as e:
        logger.error(f"Error fetching job openings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/jobs/{job_id}")
async def get_job_opening(job_id: str):
    """Get a single job opening by ID"""
    try:
        job = await job_openings_crud.get_by_id(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job opening not found")
        return serialize_datetime_fields(job)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching job opening {job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Job Applications Endpoint
@api_router.post("/jobs/{job_id}/apply")
async def submit_job_application(job_id: str, application: JobApplicationCreate):
    """Submit a job application"""
    try:
        # Verify job exists
        job = await job_openings_crud.get_by_id(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job opening not found")
        
        # Create application
        application_data = application.dict()
        application_data["jobId"] = job_id
        
        result = await job_applications_crud.create(application_data)
        
        return APIResponse(
            success=True,
            message="Application submitted successfully",
            data={"applicationId": result["id"]}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting job application: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Contact Form Endpoint
@api_router.post("/contact")
async def submit_contact_form(contact: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        result = await contact_submissions_crud.create(contact.dict())
        
        return APIResponse(
            success=True,
            message="Contact form submitted successfully",
            data={"submissionId": result["id"]}
        )
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Testimonials Endpoint
@api_router.get("/testimonials")
async def get_testimonials():
    """Get approved testimonials"""
    try:
        testimonials = await testimonials_crud.get_all()
        return serialize_datetime_fields(testimonials)
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# FAQ Endpoint
@api_router.get("/faq")
async def get_faq():
    """Get active FAQ items"""
    try:
        faqs = await faqs_crud.get_all()
        return serialize_datetime_fields(faqs)
    except Exception as e:
        logger.error(f"Error fetching FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Donation Endpoints
@api_router.get("/donation-tiers")
async def get_donation_tiers():
    """Get donation tier information (static data)"""
    return {
        "tiers": [
            {
                "id": "supporter",
                "name": "Supporter",
                "amount": 25,
                "currency": "EUR",
                "description": "Help us maintain our research databases and online resources.",
                "benefits": ["Monthly newsletter", "Access to research summaries"]
            },
            {
                "id": "advocate",
                "name": "Advocate",
                "amount": 50,
                "currency": "EUR",
                "description": "Support our training programs for young journalists.",
                "benefits": ["Monthly newsletter", "Access to research summaries", "Invitation to webinars"]
            },
            {
                "id": "partner",
                "name": "Partner",
                "amount": 100,
                "currency": "EUR",
                "description": "Fund field research and analytical projects.",
                "benefits": ["Monthly newsletter", "Full research reports", "Webinar access", "Annual impact report"]
            },
            {
                "id": "champion",
                "name": "Champion",
                "amount": 250,
                "currency": "EUR",
                "description": "Enable our comprehensive conflict analysis and documentation work.",
                "benefits": ["All previous benefits", "Direct consultation opportunities", "Priority project updates"]
            }
        ]
    }

@api_router.post("/donate")
async def process_donation(donation: DonationCreate):
    """Process a donation (simplified version - would integrate with payment gateway)"""
    try:
        # In a real implementation, this would integrate with Stripe, PayPal, etc.
        donation_data = donation.dict()
        donation_data["status"] = "completed"  # Simulated successful payment
        donation_data["paymentId"] = f"sim_{donation_data['donorName'].replace(' ', '_').lower()}_donation"
        
        result = await donations_crud.create(donation_data)
        
        return APIResponse(
            success=True,
            message="Donation processed successfully",
            data={"donationId": result.get("id", result.get("_id")), "paymentId": donation_data["paymentId"]}
        )
    except Exception as e:
        logger.error(f"Error processing donation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """API health check"""
    return {
        "status": "healthy",
        "message": "War:Observe API is running",
        "timestamp": datetime.utcnow().isoformat()
    }

# Admin CRUD endpoints
@api_router.get("/admin/collections")
async def get_collections_info():
    """Get information about all collections"""
    try:
        collections_info = []
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        for name, crud in crud_instances.items():
            count = await crud.count()
            collections_info.append({
                'name': name,
                'count': count,
                'display_name': name.replace('_', ' ').title()
            })
        
        return {"collections": collections_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/{collection_name}")
async def get_collection_data(collection_name: str, skip: int = 0, limit: int = 50):
    """Get all data from a specific collection"""
    try:
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        if collection_name not in crud_instances:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        crud = crud_instances[collection_name]
        data = await crud.get_all(skip=skip, limit=limit)
        total = await crud.count()
        
        return {
            "collection": collection_name,
            "data": data,
            "total": total,
            "skip": skip,
            "limit": limit
        }
    except HTTPException:
        raise  # Re-raise HTTPExceptions as-is
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/{collection_name}/{item_id}")
async def get_item_by_id(collection_name: str, item_id: str):
    """Get specific item by ID"""
    try:
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        if collection_name not in crud_instances:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        crud = crud_instances[collection_name]
        item = await crud.get_by_id(item_id)
        
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        return item
    except HTTPException:
        raise  # Re-raise HTTPExceptions as-is
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/{collection_name}/{item_id}")
async def update_item(collection_name: str, item_id: str, update_data: dict):
    """Update specific item"""
    try:
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        if collection_name not in crud_instances:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        crud = crud_instances[collection_name]
        
        # Remove system fields that shouldn't be updated
        system_fields = ['id', '_id', 'createdAt']
        for field in system_fields:
            update_data.pop(field, None)
        
        # Convert datetime strings to datetime objects if needed
        for key, value in update_data.items():
            if isinstance(value, str) and ('date' in key.lower() or 'at' in key.lower()):
                try:
                    from datetime import datetime
                    update_data[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass  # Keep as string if parsing fails
        
        updated_item = await crud.update(item_id, update_data)
        
        if not updated_item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        return APIResponse(
            success=True,
            message="Item updated successfully",
            data=updated_item
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/{collection_name}/{item_id}")
async def delete_item(collection_name: str, item_id: str):
    """Delete specific item"""
    try:
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        if collection_name not in crud_instances:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        crud = crud_instances[collection_name]
        success = await crud.delete(item_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Item not found")
        
        return APIResponse(
            success=True,
            message="Item deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/{collection_name}")
async def create_item(collection_name: str, item_data: dict):
    """Create new item in collection"""
    try:
        crud_instances = {
            'news_articles': news_articles_crud,
            'team_members': team_members_crud,
            'research_projects': research_projects_crud,
            'partners': partners_crud,
            'resources': resources_crud,
            'job_openings': job_openings_crud,
            'testimonials': testimonials_crud,
            'faq': faqs_crud,
            'donations': donations_crud
        }
        
        if collection_name not in crud_instances:
            raise HTTPException(status_code=404, detail="Collection not found")
        
        crud = crud_instances[collection_name]
        
        # Convert datetime strings to datetime objects if needed
        for key, value in item_data.items():
            if isinstance(value, str) and ('date' in key.lower() or 'at' in key.lower()):
                try:
                    from datetime import datetime
                    item_data[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass  # Keep as string if parsing fails
        
        new_item = await crud.create(item_data)
        
        return APIResponse(
            success=True,
            message="Item created successfully",
            data=new_item
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to seed database if needed
@app.on_event("startup")
async def startup_event():
    """Initialize database with seed data if empty"""
    try:
        # Check if we need to seed the database
        team_count = await team_members_crud.count()
        
        if team_count == 0:
            logger.info("Database appears empty, running seed script...")
            from seed_data import seed_database
            await seed_database()
            logger.info("Database seeding completed")
        else:
            logger.info(f"Database already contains {team_count} team members, skipping seed")
            
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Clean up database connections"""
    await database.close_connection()