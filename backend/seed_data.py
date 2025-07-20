"""
Seed script to populate database with initial data from mock.js
"""
import asyncio
import os
from datetime import datetime, date
from database import (
    news_articles_crud, team_members_crud, research_projects_crud,
    partners_crud, resources_crud, job_openings_crud, testimonials_crud, faqs_crud
)

# Mock data equivalent to frontend mock.js
TEAM_MEMBERS = [
    {
        "name": "Egor Brailyan",
        "position": "Head of the analytical department, journalist",
        "email": "office@warobserve.com",
        "image": "https://www.warobserve.com/img/team/EB.jpg",
        "bio": "Experienced journalist specializing in conflict analysis and international relations with over 8 years in the field.",
        "joinDate": datetime(2023, 1, 15)
    },
    {
        "name": "Bohdana Bondarenko",
        "position": "Director of international communications, journalist",
        "email": "office@warobserve.com",
        "image": "https://www.warobserve.com/img/team/BB.jfif",
        "bio": "International communications expert with extensive experience in media relations and conflict reporting.",
        "joinDate": datetime(2023, 2, 1)
    },
    {
        "name": "Oleh Denysenko",
        "position": "Manager of analytical projects, photocorrespondent",
        "email": "office@warobserve.com",
        "image": "https://www.warobserve.com/img/team/%D0%9E%D0%9E.jpeg",
        "bio": "Analytical projects manager and photojournalist documenting conflicts and humanitarian crises.",
        "joinDate": datetime(2023, 3, 10)
    },
    {
        "name": "Valeria Skvortsova",
        "position": "Executive director of UCIPR",
        "email": "valeriia.skvortsova@ucipr.org.ua",
        "image": "https://www.warobserve.com/img/team/valeria.jpg",
        "bio": "Executive director with expertise in public policy and international communications.",
        "joinDate": datetime(2023, 1, 1)
    },
    {
        "name": "Bohdan Zaychenko",
        "position": "International law expert and human rights expert",
        "email": "Office@warobserve.com",
        "image": "https://www.warobserve.com/img/team/B.Z..jpeg",
        "bio": "International law specialist focusing on human rights violations in armed conflicts.",
        "joinDate": datetime(2023, 4, 1)
    },
    {
        "name": "Ambassador",
        "position": "Content maker",
        "email": "office@warobserve.com",
        "image": "https://www.warobserve.com/img/team/%D0%B0%D0%BC.jpg",
        "bio": "Creative content specialist developing multimedia materials for conflict documentation.",
        "joinDate": datetime(2023, 5, 15)
    }
]

NEWS_ARTICLES = [
    {
        "title": "Global Peace Summit: Comprehensive Analysis of International Initiatives",
        "excerpt": "A detailed examination of recent global peace initiatives and their potential impact on ongoing conflicts in Eastern Europe.",
        "content": "The Global Peace Summit represents a critical juncture in international diplomacy. This comprehensive analysis examines the various international initiatives presented at the summit and evaluates their potential effectiveness in addressing ongoing conflicts, particularly in Eastern Europe. Through detailed research and expert interviews, this report provides insights into the challenges and opportunities facing global peace efforts.",
        "author": "Egor Brailyan",
        "publishedDate": datetime(2024, 3, 15),
        "category": "Analysis",
        "imageUrl": "https://images.unsplash.com/photo-1541948840-b5b86b1eea1b?w=800&h=400&fit=crop",
        "tags": ["diplomacy", "peace", "ukraine", "international-relations"]
    },
    {
        "title": "Media Coverage Ethics in Active Conflict Zones",
        "excerpt": "Exploring the challenges and responsibilities of journalists reporting from war zones while maintaining objectivity and safety.",
        "content": "Ethical journalism in conflict zones requires careful balance between truth-telling and safety considerations. This analysis explores the complex challenges faced by journalists working in active conflict areas, examining case studies from recent conflicts and providing guidance on maintaining professional standards while ensuring personal safety. The report includes interviews with experienced war correspondents and recommendations for media organizations.",
        "author": "Bohdana Bondarenko",
        "publishedDate": datetime(2024, 3, 10),
        "category": "Journalism",
        "imageUrl": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
        "tags": ["ethics", "journalism", "safety", "conflict-reporting"]
    },
    {
        "title": "Documentation of Human Rights Violations: Legal Framework",
        "excerpt": "An analytical study on the legal mechanisms for documenting and prosecuting war crimes in contemporary conflicts.",
        "content": "International law provides clear frameworks for documenting human rights violations, yet implementation remains challenging in active conflict zones. This study examines the legal mechanisms available for documenting and prosecuting war crimes, analyzing recent case studies and identifying best practices for evidence collection and preservation. The report includes recommendations for improving documentation processes and strengthening legal accountability.",
        "author": "Bohdan Zaychenko",
        "publishedDate": datetime(2024, 3, 5),
        "category": "Legal Analysis",
        "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=400&fit=crop",
        "tags": ["human-rights", "legal-framework", "documentation", "war-crimes"]
    },
    {
        "title": "Youth Engagement in Conflict Resolution: New Perspectives",
        "excerpt": "How young journalists and experts are reshaping the narrative around conflict resolution and peace-building efforts.",
        "content": "Young voices bring fresh perspectives to traditional conflict resolution approaches. This research examines how young journalists, experts, and activists are contributing to peace-building efforts and changing the discourse around conflict resolution. Through interviews and case studies, the report highlights innovative approaches and the unique contributions of youth to international peace efforts.",
        "author": "Valeria Skvortsova",
        "publishedDate": datetime(2024, 2, 28),
        "category": "Youth Engagement",
        "imageUrl": "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=400&fit=crop",
        "tags": ["youth", "conflict-resolution", "peace-building", "new-perspectives"]
    }
]

RESEARCH_PROJECTS = [
    {
        "title": "Comprehensive Analysis of International Peace Initiatives",
        "description": "An in-depth study examining various international peace initiatives and their effectiveness in resolving contemporary conflicts.",
        "status": "Completed",
        "startDate": datetime(2024, 1, 15),
        "endDate": datetime(2024, 3, 20),
        "team": ["Egor Brailyan", "Valeria Skvortsova"],
        "category": "Peace Studies",
        "results": "Published comprehensive report with policy recommendations for international organizations."
    },
    {
        "title": "Media Coverage Impact Assessment",
        "description": "Analyzing the impact of media coverage on public perception and policy decisions regarding armed conflicts.",
        "status": "In Progress",
        "startDate": datetime(2024, 2, 1),
        "endDate": datetime(2024, 5, 30),
        "team": ["Bohdana Bondarenko", "Oleh Denysenko"],
        "category": "Media Analysis",
        "results": "Preliminary findings show significant correlation between media framing and public support."
    },
    {
        "title": "Legal Documentation Framework for Conflict Zones",
        "description": "Developing standardized procedures for legal documentation of human rights violations in active conflict zones.",
        "status": "In Progress",
        "startDate": datetime(2024, 1, 10),
        "endDate": datetime(2024, 6, 15),
        "team": ["Bohdan Zaychenko", "Egor Brailyan"],
        "category": "Legal Framework",
        "results": "Framework currently being tested with partner organizations in the field."
    }
]

PARTNERS = [
    {
        "name": "Ukrainian Crisis Information and Policy Research (UCIPR)",
        "logo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
        "description": "Leading Ukrainian think tank focused on crisis research and policy development.",
        "website": "https://ucipr.org.ua"
    },
    {
        "name": "European Press Institute",
        "logo": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop",
        "description": "Organization supporting press freedom and journalism excellence across Europe.",
        "website": "https://example.com"
    },
    {
        "name": "International Journalism Safety Institute",
        "logo": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=100&fit=crop",
        "description": "Dedicated to protecting journalists and promoting safety in conflict reporting.",
        "website": "https://example.com"
    },
    {
        "name": "Global Peace Research Network",
        "logo": "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&h=100&fit=crop",
        "description": "International network of researchers focusing on peace and conflict studies.",
        "website": "https://example.com"
    }
]

RESOURCES = [
    {
        "title": "Conflict Reporting Safety Guidelines",
        "type": "Guide",
        "downloadUrl": "/downloads/safety-guidelines.pdf",
        "description": "Comprehensive safety guidelines for journalists working in conflict zones.",
        "publishedDate": datetime(2024, 2, 15),
        "fileType": "PDF"
    },
    {
        "title": "International Law Reference Manual",
        "type": "Manual",
        "downloadUrl": "/downloads/law-reference.pdf",
        "description": "Reference manual on international humanitarian law and human rights documentation.",
        "publishedDate": datetime(2024, 1, 20),
        "fileType": "PDF"
    },
    {
        "title": "Media Ethics in Conflict Zones Toolkit",
        "type": "Toolkit",
        "downloadUrl": "/downloads/ethics-toolkit.pdf",
        "description": "Practical toolkit for maintaining ethical standards in conflict reporting.",
        "publishedDate": datetime(2024, 3, 1),
        "fileType": "PDF"
    },
    {
        "title": "Young Journalists Training Materials",
        "type": "Training",
        "downloadUrl": "/downloads/training-materials.zip",
        "description": "Complete training package for young journalists entering conflict reporting.",
        "publishedDate": datetime(2024, 2, 10),
        "fileType": "ZIP"
    }
]

JOB_OPENINGS = [
    {
        "title": "Junior Research Analyst",
        "department": "Research",
        "location": "Kyiv, Ukraine (Hybrid)",
        "type": "Full-time",
        "experience": "1-2 years",
        "description": "Join our analytical team to research international conflicts and peace initiatives.",
        "requirements": [
            "Bachelor's degree in International Relations, Journalism, or related field",
            "Strong analytical skills",
            "Excellent written English",
            "Knowledge of conflict analysis methodologies"
        ],
        "applicationDeadline": datetime(2024, 4, 30)
    },
    {
        "title": "Communications Specialist",
        "department": "Communications",
        "location": "Brussels, Belgium",
        "type": "Full-time",
        "experience": "2-3 years",
        "description": "Manage international communications and media relations for our Brussels office.",
        "requirements": [
            "Experience in communications or journalism",
            "Fluency in English and French",
            "Social media management skills",
            "Experience with international organizations"
        ],
        "applicationDeadline": datetime(2024, 5, 15)
    },
    {
        "title": "Legal Documentation Specialist",
        "department": "Legal",
        "location": "Remote",
        "type": "Contract",
        "experience": "3+ years",
        "description": "Support legal documentation of human rights violations in conflict zones.",
        "requirements": [
            "Law degree with focus on international law",
            "Experience in human rights documentation",
            "Knowledge of conflict zones",
            "Multilingual capabilities preferred"
        ],
        "applicationDeadline": datetime(2024, 4, 20)
    }
]

TESTIMONIALS = [
    {
        "name": "Dr. Sarah Mitchell",
        "position": "International Relations Professor, University of Cambridge",
        "content": "War:Observe provides crucial analytical insights that bridge the gap between academic research and practical conflict resolution. Their work is invaluable for understanding contemporary conflicts.",
        "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        "isApproved": True
    },
    {
        "name": "Marcus Rodriguez",
        "position": "Senior Correspondent, Global News Network",
        "content": "The resources and training provided by War:Observe have been instrumental in my development as a conflict journalist. Their commitment to ethical reporting is exemplary.",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "isApproved": True
    },
    {
        "name": "Anna Kowalski",
        "position": "Human Rights Lawyer, International Justice Coalition",
        "content": "War:Observe's documentation work provides essential evidence for human rights cases. Their meticulous approach to legal documentation sets the standard in the field.",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "isApproved": True
    }
]

FAQ_DATA = [
    {
        "question": "What is War:Observe's primary mission?",
        "answer": "War:Observe is an international analytical and media project supporting young experts, journalists, and opinion leaders who strive to objectively cover armed conflicts, with a particular focus on the war initiated by Russia against Ukraine.",
        "category": "General",
        "order": 1
    },
    {
        "question": "How can I contribute to your research projects?",
        "answer": "We welcome contributions from researchers, journalists, and subject matter experts. You can apply for our open positions, participate in our internship programs, or collaborate on specific research projects. Contact us at office@warobserve.com to discuss opportunities.",
        "category": "Collaboration",
        "order": 2
    },
    {
        "question": "Do you provide training for young journalists?",
        "answer": "Yes, we offer comprehensive training programs for young journalists and students in international relations. Our programs cover ethical reporting in conflict zones, safety protocols, and analytical methodologies.",
        "category": "Training",
        "order": 3
    },
    {
        "question": "How can my organization partner with War:Observe?",
        "answer": "We collaborate with various organizations including think tanks, media outlets, and international institutions. Partnership opportunities include joint research projects, exchange programs, and shared resources. Please reach out to discuss potential collaborations.",
        "category": "Partnerships",
        "order": 4
    }
]

async def seed_database():
    """Seed the database with initial data"""
    print("🌱 Starting database seeding...")
    
    try:
        # Seed team members
        print("👥 Seeding team members...")
        for member_data in TEAM_MEMBERS:
            await team_members_crud.create(member_data)
        print(f"✅ Created {len(TEAM_MEMBERS)} team members")
        
        # Seed news articles
        print("📰 Seeding news articles...")
        for article_data in NEWS_ARTICLES:
            await news_articles_crud.create(article_data)
        print(f"✅ Created {len(NEWS_ARTICLES)} news articles")
        
        # Seed research projects
        print("🔬 Seeding research projects...")
        for project_data in RESEARCH_PROJECTS:
            await research_projects_crud.create(project_data)
        print(f"✅ Created {len(RESEARCH_PROJECTS)} research projects")
        
        # Seed partners
        print("🤝 Seeding partners...")
        for partner_data in PARTNERS:
            await partners_crud.create(partner_data)
        print(f"✅ Created {len(PARTNERS)} partners")
        
        # Seed resources
        print("📚 Seeding resources...")
        for resource_data in RESOURCES:
            await resources_crud.create(resource_data)
        print(f"✅ Created {len(RESOURCES)} resources")
        
        # Seed job openings
        print("💼 Seeding job openings...")
        for job_data in JOB_OPENINGS:
            await job_openings_crud.create(job_data)
        print(f"✅ Created {len(JOB_OPENINGS)} job openings")
        
        # Seed testimonials
        print("💬 Seeding testimonials...")
        for testimonial_data in TESTIMONIALS:
            await testimonials_crud.create(testimonial_data)
        print(f"✅ Created {len(TESTIMONIALS)} testimonials")
        
        # Seed FAQ
        print("❓ Seeding FAQ...")
        for faq_data in FAQ_DATA:
            await faqs_crud.create(faq_data)
        print(f"✅ Created {len(FAQ_DATA)} FAQ items")
        
        print("🎉 Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during database seeding: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database())