# War:Observe Backend API Contracts

## Database Models & Collections

### 1. News Articles (`news_articles`)
```javascript
{
  _id: ObjectId,
  title: String,
  excerpt: String,
  content: String,
  author: String,
  publishedDate: Date,
  category: String,
  imageUrl: String,
  tags: [String],
  status: String // 'published', 'draft'
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Team Members (`team_members`)
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  email: String,
  image: String,
  bio: String,
  isActive: Boolean,
  joinDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Research Projects (`research_projects`)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String, // 'Completed', 'In Progress', 'Planned'
  startDate: Date,
  endDate: Date,
  team: [String], // Team member names
  category: String,
  results: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Partners (`partners`)
```javascript
{
  _id: ObjectId,
  name: String,
  logo: String,
  description: String,
  website: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Resources (`resources`)
```javascript
{
  _id: ObjectId,
  title: String,
  type: String, // 'Guide', 'Manual', 'Toolkit', 'Training'
  downloadUrl: String,
  description: String,
  publishedDate: Date,
  fileType: String, // 'PDF', 'ZIP', 'DOC'
  downloadCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Contact Submissions (`contact_submissions`)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'responded'
  submittedAt: Date
}
```

### 7. Job Applications (`job_applications`)
```javascript
{
  _id: ObjectId,
  jobId: ObjectId, // Reference to job_openings
  name: String,
  email: String,
  phone: String,
  experience: String,
  coverLetter: String,
  status: String, // 'submitted', 'reviewing', 'interviewed', 'rejected', 'hired'
  submittedAt: Date
}
```

### 8. Job Openings (`job_openings`)
```javascript
{
  _id: ObjectId,
  title: String,
  department: String,
  location: String,
  type: String, // 'Full-time', 'Part-time', 'Contract'
  experience: String,
  description: String,
  requirements: [String],
  applicationDeadline: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 9. Donations (`donations`)
```javascript
{
  _id: ObjectId,
  donorName: String,
  donorEmail: String,
  amount: Number,
  currency: String,
  tier: String, // 'Supporter', 'Advocate', 'Partner', 'Champion'
  paymentId: String, // External payment processor ID
  status: String, // 'pending', 'completed', 'failed'
  donatedAt: Date
}
```

### 10. Testimonials (`testimonials`)
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  content: String,
  avatar: String,
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 11. FAQ (`faq`)
```javascript
{
  _id: ObjectId,
  question: String,
  answer: String,
  category: String,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### News & Articles
- `GET /api/news` - Get all published news articles (with pagination)
- `GET /api/news/:id` - Get single news article
- `GET /api/news/category/:category` - Get articles by category

#### Team
- `GET /api/team` - Get all active team members
- `GET /api/team/:id` - Get single team member

#### Research Projects
- `GET /api/research` - Get all research projects
- `GET /api/research/:id` - Get single research project

#### Partners
- `GET /api/partners` - Get all active partners

#### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/download/:id` - Download resource (increment counter)

#### Job Openings
- `GET /api/jobs` - Get all active job openings
- `GET /api/jobs/:id` - Get single job opening

#### Contact & Applications
- `POST /api/contact` - Submit contact form
- `POST /api/jobs/:id/apply` - Submit job application

#### Donations
- `POST /api/donate` - Process donation (integrates with payment gateway)
- `GET /api/donation-tiers` - Get donation tier information

#### Testimonials & FAQ
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/faq` - Get active FAQ items

### Admin Endpoints (Authentication Required - Future Enhancement)
*Note: Basic CRUD operations for content management*

#### News Management
- `POST /api/admin/news` - Create news article
- `PUT /api/admin/news/:id` - Update news article
- `DELETE /api/admin/news/:id` - Delete news article

#### Content Management
- Similar CRUD endpoints for team, research, partners, resources, jobs, testimonials, FAQ

#### Application Management
- `GET /api/admin/contacts` - Get contact submissions
- `GET /api/admin/applications` - Get job applications
- `PUT /api/admin/applications/:id` - Update application status

## Mock Data Migration Plan

### Current Mock Data in `mock.js`:
1. **teamMembers** (6 items) → Seed `team_members` collection
2. **newsArticles** (4 items) → Seed `news_articles` collection  
3. **researchProjects** (3 items) → Seed `research_projects` collection
4. **partners** (4 items) → Seed `partners` collection
5. **resources** (4 items) → Seed `resources` collection
6. **donationTiers** → Static configuration (no DB needed)
7. **jobOpenings** (3 items) → Seed `job_openings` collection
8. **testimonials** (3 items) → Seed `testimonials` collection
9. **faqData** → Convert to `faq` collection

## Frontend Integration Plan

### 1. Replace Mock Imports
Remove `import { ... } from '../mock'` and replace with API calls:

```javascript
// Before: import { newsArticles } from '../mock'
// After: const newsArticles = await fetchNewsArticles()

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// API utility functions
const fetchNewsArticles = async () => {
  const response = await axios.get(`${API_BASE}/news`);
  return response.data;
};
```

### 2. Update Component State Management
Convert static mock data to dynamic API calls:

```javascript
// Before: const [articles] = useState(newsArticles);
// After: 
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadArticles = async () => {
    try {
      const data = await fetchNewsArticles();
      setArticles(data);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };
  loadArticles();
}, []);
```

### 3. Form Submissions Integration
Update form handlers to POST to backend:

```javascript
// Contact form
const handleContactSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${API_BASE}/contact`, contactForm);
    alert('Message sent successfully!');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    alert('Failed to send message. Please try again.');
  }
};

// Job application
const handleApplicationSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${API_BASE}/jobs/${applicationForm.jobId}/apply`, applicationForm);
    alert('Application submitted successfully!');
    // Reset form
  } catch (error) {
    alert('Failed to submit application. Please try again.');
  }
};
```

### 4. Add Loading States
Implement proper loading and error states:

```javascript
if (loading) return <div className="loading">Loading...</div>;
if (error) return <div className="error">Error loading content</div>;
```

## Implementation Priority

### Phase 1: Core Content API (High Priority)
1. News articles CRUD
2. Team members CRUD  
3. Research projects CRUD
4. Partners CRUD
5. Resources CRUD
6. FAQ CRUD
7. Testimonials CRUD

### Phase 2: Interactive Features (Medium Priority)
1. Contact form submission
2. Job applications
3. Resource download tracking

### Phase 3: Advanced Features (Low Priority)
1. Donation processing (requires payment gateway)
2. Admin authentication and content management
3. Email notifications
4. Analytics and reporting

## Error Handling Strategy

### Backend Error Responses
```javascript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid email format",
    details: {...}
  }
}
```

### Frontend Error Display
- Form validation errors
- Network error handling
- User-friendly error messages
- Loading states during API calls

## Database Initialization

### Seed Data Script
Create seed script to populate initial data from mock.js:
- Run once during deployment
- Maintain data consistency
- Include sample content for testing

This contract ensures seamless migration from mock data to a fully functional backend system while maintaining all existing frontend functionality.