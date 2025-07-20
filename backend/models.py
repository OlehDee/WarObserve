from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import uuid
from enum import Enum

# Enums for controlled values
class NewsStatus(str, Enum):
    PUBLISHED = "published"
    DRAFT = "draft"

class ProjectStatus(str, Enum):
    COMPLETED = "Completed"
    IN_PROGRESS = "In Progress"
    PLANNED = "Planned"

class ResourceType(str, Enum):
    GUIDE = "Guide"
    MANUAL = "Manual"
    TOOLKIT = "Toolkit"
    TRAINING = "Training"

class FileType(str, Enum):
    PDF = "PDF"
    ZIP = "ZIP"
    DOC = "DOC"

class JobType(str, Enum):
    FULL_TIME = "Full-time"
    PART_TIME = "Part-time"
    CONTRACT = "Contract"

class ApplicationStatus(str, Enum):
    SUBMITTED = "submitted"
    REVIEWING = "reviewing"
    INTERVIEWED = "interviewed"
    REJECTED = "rejected"
    HIRED = "hired"

class ContactStatus(str, Enum):
    NEW = "new"
    READ = "read"
    RESPONDED = "responded"

class DonationStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

# Base Models for API Responses
class NewsArticle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    author: str
    publishedDate: datetime
    category: str
    imageUrl: str
    tags: List[str] = []
    status: NewsStatus = NewsStatus.PUBLISHED
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class NewsArticleCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    author: str
    publishedDate: datetime
    category: str
    imageUrl: str
    tags: List[str] = []
    status: NewsStatus = NewsStatus.PUBLISHED

class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    email: str
    image: str
    bio: str
    isActive: bool = True
    joinDate: datetime
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class TeamMemberCreate(BaseModel):
    name: str
    position: str
    email: str
    image: str
    bio: str
    joinDate: datetime

class ResearchProject(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    status: ProjectStatus
    startDate: datetime
    endDate: Optional[datetime] = None
    team: List[str]
    category: str
    results: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ResearchProjectCreate(BaseModel):
    title: str
    description: str
    status: ProjectStatus
    startDate: datetime
    endDate: Optional[datetime] = None
    team: List[str]
    category: str
    results: str

class Partner(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    logo: str
    description: str
    website: str
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class PartnerCreate(BaseModel):
    name: str
    logo: str
    description: str
    website: str

class Resource(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: ResourceType
    downloadUrl: str
    description: str
    publishedDate: datetime
    fileType: FileType
    downloadCount: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ResourceCreate(BaseModel):
    title: str
    type: ResourceType
    downloadUrl: str
    description: str
    publishedDate: datetime
    fileType: FileType

class JobOpening(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: JobType
    experience: str
    description: str
    requirements: List[str]
    applicationDeadline: datetime
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class JobOpeningCreate(BaseModel):
    title: str
    department: str
    location: str
    type: JobType
    experience: str
    description: str
    requirements: List[str]
    applicationDeadline: datetime

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: ContactStatus = ContactStatus.NEW
    submittedAt: datetime = Field(default_factory=datetime.utcnow)

    @validator('email')
    def validate_email(cls, v):
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class JobApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    jobId: str
    name: str
    email: str
    phone: str
    experience: str
    coverLetter: str
    status: ApplicationStatus = ApplicationStatus.SUBMITTED
    submittedAt: datetime = Field(default_factory=datetime.utcnow)

    @validator('email')
    def validate_email(cls, v):
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class JobApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str
    experience: str
    coverLetter: str

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    content: str
    avatar: str
    isApproved: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    position: str
    content: str
    avatar: str

class FAQ(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    category: str = "General"
    order: int = 0
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class FAQCreate(BaseModel):
    question: str
    answer: str
    category: str = "General"
    order: int = 0

class Donation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    donorName: str
    donorEmail: str
    amount: float
    currency: str = "EUR"
    tier: str
    paymentId: Optional[str] = None
    status: DonationStatus = DonationStatus.PENDING
    donatedAt: datetime = Field(default_factory=datetime.utcnow)

    @validator('email')
    def validate_email(cls, v):
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class DonationCreate(BaseModel):
    donorName: str
    donorEmail: str
    amount: float
    tier: str

# Response Models
class APIResponse(BaseModel):
    success: bool = True
    message: str = "Success"
    data: Optional[dict] = None

class APIError(BaseModel):
    success: bool = False
    error: dict

# Pagination Models
class PaginationParams(BaseModel):
    page: int = Field(1, ge=1)
    limit: int = Field(10, ge=1, le=100)

class PaginatedResponse(BaseModel):
    items: List[dict]
    total: int
    page: int
    limit: int
    totalPages: int