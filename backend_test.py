#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for War:Observe Admin CRUD Endpoints
Tests all admin endpoints with realistic data and error scenarios
"""

import requests
import json
import uuid
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')
BASE_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BASE_URL}/api"

class WarObserveAPITester:
    def __init__(self):
        self.base_url = API_BASE
        self.test_results = []
        self.created_items = {}  # Track created items for cleanup
        
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_health_check(self):
        """Test API health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_result("API Health Check", True, f"API is healthy: {data.get('message', 'OK')}")
                return True
            else:
                self.log_result("API Health Check", False, f"Health check failed with status {response.status_code}")
                return False
        except Exception as e:
            self.log_result("API Health Check", False, f"Health check failed: {str(e)}")
            return False
    
    def test_get_collections_info(self):
        """Test GET /api/admin/collections endpoint"""
        try:
            response = requests.get(f"{self.base_url}/admin/collections", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                collections = data.get('collections', [])
                
                expected_collections = [
                    'news_articles', 'team_members', 'research_projects', 
                    'partners', 'resources', 'job_openings', 
                    'testimonials', 'faq', 'donations'
                ]
                
                found_collections = [c['name'] for c in collections]
                missing = set(expected_collections) - set(found_collections)
                
                if not missing:
                    self.log_result("Get Collections Info", True, 
                                  f"All {len(collections)} collections found with counts")
                    return collections
                else:
                    self.log_result("Get Collections Info", False, 
                                  f"Missing collections: {missing}")
                    return collections
            else:
                self.log_result("Get Collections Info", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return []
        except Exception as e:
            self.log_result("Get Collections Info", False, f"Exception: {str(e)}")
            return []
    
    def test_get_collection_data(self, collection_name):
        """Test GET /api/admin/{collection_name} endpoint"""
        try:
            # Test basic retrieval
            response = requests.get(f"{self.base_url}/admin/{collection_name}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                items = data.get('data', [])
                total = data.get('total', 0)
                
                self.log_result(f"Get {collection_name} Data", True, 
                              f"Retrieved {len(items)} items (total: {total})")
                
                # Test pagination
                if total > 0:
                    response_paginated = requests.get(
                        f"{self.base_url}/admin/{collection_name}?skip=0&limit=2", 
                        timeout=10
                    )
                    if response_paginated.status_code == 200:
                        paginated_data = response_paginated.json()
                        paginated_items = paginated_data.get('data', [])
                        self.log_result(f"Get {collection_name} Pagination", True, 
                                      f"Pagination works: requested 2, got {len(paginated_items)}")
                    else:
                        self.log_result(f"Get {collection_name} Pagination", False, 
                                      f"Pagination failed: {response_paginated.status_code}")
                
                return items
            else:
                self.log_result(f"Get {collection_name} Data", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return []
        except Exception as e:
            self.log_result(f"Get {collection_name} Data", False, f"Exception: {str(e)}")
            return []
    
    def test_get_nonexistent_collection(self):
        """Test GET /api/admin/{collection_name} with invalid collection"""
        try:
            response = requests.get(f"{self.base_url}/admin/invalid_collection", timeout=10)
            
            if response.status_code == 404:
                self.log_result("Get Nonexistent Collection", True, 
                              "Correctly returned 404 for invalid collection")
            else:
                self.log_result("Get Nonexistent Collection", False, 
                              f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Get Nonexistent Collection", False, f"Exception: {str(e)}")
    
    def get_sample_data(self, collection_name):
        """Get realistic sample data for each collection"""
        current_time = datetime.now(timezone.utc).isoformat()
        
        sample_data = {
            'news_articles': {
                'title': 'Ukraine Conflict Analysis: Latest Developments in Eastern Regions',
                'content': 'Comprehensive analysis of recent military and humanitarian developments in the ongoing Ukraine conflict, focusing on civilian impact and international response.',
                'author': 'Dr. Maria Kovalenko',
                'category': 'conflict_analysis',
                'tags': ['ukraine', 'conflict', 'humanitarian', 'analysis'],
                'published': True,
                'featured': False,
                'publishedAt': current_time,
                'imageUrl': 'https://example.com/ukraine-analysis.jpg'
            },
            'team_members': {
                'name': 'Dr. Alexei Petrov',
                'position': 'Senior Conflict Analyst',
                'bio': 'Expert in Eastern European conflicts with 15 years of field experience in war zones.',
                'email': 'a.petrov@warobserve.org',
                'imageUrl': 'https://example.com/team/petrov.jpg',
                'socialLinks': {
                    'linkedin': 'https://linkedin.com/in/alexei-petrov',
                    'twitter': 'https://twitter.com/apetrov_analyst'
                },
                'active': True,
                'joinedAt': current_time
            },
            'research_projects': {
                'title': 'Civilian Protection in Urban Warfare: Mariupol Case Study',
                'description': 'Detailed analysis of civilian protection mechanisms during the siege of Mariupol.',
                'status': 'ongoing',
                'startDate': current_time,
                'leadResearcher': 'Dr. Elena Volkov',
                'tags': ['urban_warfare', 'civilian_protection', 'mariupol'],
                'fundingAmount': 75000,
                'publications': []
            },
            'partners': {
                'name': 'International Crisis Group',
                'description': 'Leading organization for conflict prevention and resolution worldwide.',
                'website': 'https://www.crisisgroup.org',
                'logoUrl': 'https://example.com/partners/icg-logo.png',
                'partnershipType': 'research',
                'active': True,
                'establishedAt': current_time
            },
            'resources': {
                'title': 'Conflict Documentation Handbook 2024',
                'description': 'Comprehensive guide for documenting war crimes and human rights violations.',
                'type': 'handbook',
                'downloadUrl': 'https://example.com/resources/documentation-handbook-2024.pdf',
                'fileSize': '2.5 MB',
                'downloadCount': 0,
                'tags': ['documentation', 'war_crimes', 'handbook'],
                'publishedAt': current_time
            },
            'job_openings': {
                'title': 'Field Researcher - Eastern Europe',
                'description': 'Seeking experienced researcher for field work in conflict zones.',
                'requirements': ['PhD in Political Science or related field', '5+ years field experience', 'Fluent in Russian/Ukrainian'],
                'location': 'Kyiv, Ukraine',
                'type': 'full-time',
                'salary': '€45,000 - €55,000',
                'active': True,
                'applicationDeadline': '2024-12-31T23:59:59Z',
                'postedAt': current_time
            },
            'testimonials': {
                'name': 'Ambassador Sarah Mitchell',
                'position': 'Former EU Special Envoy',
                'content': 'War:Observe provides invaluable analysis that helps policymakers understand complex conflict dynamics.',
                'rating': 5,
                'approved': True,
                'submittedAt': current_time
            },
            'faq': {
                'question': 'How does War:Observe ensure the accuracy of its conflict analysis?',
                'answer': 'We employ rigorous verification methods including multiple source confirmation, field verification when possible, and peer review by subject matter experts.',
                'category': 'methodology',
                'order': 1,
                'active': True
            },
            'donations': {
                'donorName': 'Anonymous Supporter',
                'donorEmail': 'supporter@example.com',
                'amount': 100,
                'currency': 'EUR',
                'tier': 'partner',
                'message': 'Keep up the important work documenting conflicts.',
                'anonymous': True,
                'status': 'completed',
                'paymentId': f'test_payment_{uuid.uuid4().hex[:8]}'
            }
        }
        
        return sample_data.get(collection_name, {})
    
    def test_create_item(self, collection_name):
        """Test POST /api/admin/{collection_name} endpoint"""
        try:
            sample_data = self.get_sample_data(collection_name)
            if not sample_data:
                self.log_result(f"Create {collection_name} Item", False, "No sample data available")
                return None
            
            response = requests.post(
                f"{self.base_url}/admin/{collection_name}",
                json=sample_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    created_item = data.get('data', {})
                    item_id = created_item.get('id') or created_item.get('_id')
                    
                    # Store for later cleanup
                    if collection_name not in self.created_items:
                        self.created_items[collection_name] = []
                    self.created_items[collection_name].append(item_id)
                    
                    self.log_result(f"Create {collection_name} Item", True, 
                                  f"Successfully created item with ID: {item_id}")
                    return created_item
                else:
                    self.log_result(f"Create {collection_name} Item", False, 
                                  f"API returned success=false: {data.get('message', 'Unknown error')}")
                    return None
            else:
                self.log_result(f"Create {collection_name} Item", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_result(f"Create {collection_name} Item", False, f"Exception: {str(e)}")
            return None
    
    def test_get_item_by_id(self, collection_name, item_id):
        """Test GET /api/admin/{collection_name}/{id} endpoint"""
        try:
            response = requests.get(f"{self.base_url}/admin/{collection_name}/{item_id}", timeout=10)
            
            if response.status_code == 200:
                item = response.json()
                self.log_result(f"Get {collection_name} Item by ID", True, 
                              f"Successfully retrieved item: {item_id}")
                
                # Verify system fields
                has_id = 'id' in item or '_id' in item
                has_created_at = 'createdAt' in item
                has_updated_at = 'updatedAt' in item
                
                if has_id and has_created_at:
                    self.log_result(f"Verify {collection_name} System Fields", True, 
                                  "System fields (id, createdAt) present")
                else:
                    self.log_result(f"Verify {collection_name} System Fields", False, 
                                  f"Missing system fields - id: {has_id}, createdAt: {has_created_at}")
                
                return item
            elif response.status_code == 404:
                self.log_result(f"Get {collection_name} Item by ID", False, 
                              f"Item not found: {item_id}")
                return None
            else:
                self.log_result(f"Get {collection_name} Item by ID", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_result(f"Get {collection_name} Item by ID", False, f"Exception: {str(e)}")
            return None
    
    def test_update_item(self, collection_name, item_id, original_item):
        """Test PUT /api/admin/{collection_name}/{id} endpoint"""
        try:
            # Prepare update data based on collection type
            update_data = {}
            if collection_name == 'news_articles':
                update_data = {'title': 'UPDATED: Ukraine Conflict Analysis - Latest Developments'}
            elif collection_name == 'team_members':
                update_data = {'position': 'UPDATED: Lead Conflict Analyst'}
            elif collection_name == 'research_projects':
                update_data = {'status': 'completed'}
            elif collection_name == 'partners':
                update_data = {'partnershipType': 'strategic'}
            elif collection_name == 'resources':
                update_data = {'downloadCount': 5}
            elif collection_name == 'job_openings':
                update_data = {'active': False}
            elif collection_name == 'testimonials':
                update_data = {'rating': 4}
            elif collection_name == 'faq':
                update_data = {'order': 2}
            elif collection_name == 'donations':
                update_data = {'amount': 150}
            
            response = requests.put(
                f"{self.base_url}/admin/{collection_name}/{item_id}",
                json=update_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    updated_item = data.get('data', {})
                    self.log_result(f"Update {collection_name} Item", True, 
                                  f"Successfully updated item: {item_id}")
                    
                    # Verify updatedAt field was modified
                    original_updated = original_item.get('updatedAt')
                    new_updated = updated_item.get('updatedAt')
                    
                    if new_updated and new_updated != original_updated:
                        self.log_result(f"Verify {collection_name} UpdatedAt", True, 
                                      "updatedAt field properly modified")
                    else:
                        self.log_result(f"Verify {collection_name} UpdatedAt", False, 
                                      "updatedAt field not properly updated")
                    
                    return updated_item
                else:
                    self.log_result(f"Update {collection_name} Item", False, 
                                  f"API returned success=false: {data.get('message', 'Unknown error')}")
                    return None
            else:
                self.log_result(f"Update {collection_name} Item", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return None
        except Exception as e:
            self.log_result(f"Update {collection_name} Item", False, f"Exception: {str(e)}")
            return None
    
    def test_delete_item(self, collection_name, item_id):
        """Test DELETE /api/admin/{collection_name}/{id} endpoint"""
        try:
            response = requests.delete(f"{self.base_url}/admin/{collection_name}/{item_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_result(f"Delete {collection_name} Item", True, 
                                  f"Successfully deleted item: {item_id}")
                    
                    # Verify item is actually deleted
                    verify_response = requests.get(f"{self.base_url}/admin/{collection_name}/{item_id}", timeout=10)
                    if verify_response.status_code == 404:
                        self.log_result(f"Verify {collection_name} Deletion", True, 
                                      "Item properly deleted (404 on subsequent GET)")
                    else:
                        self.log_result(f"Verify {collection_name} Deletion", False, 
                                      f"Item still exists after deletion (status: {verify_response.status_code})")
                    
                    return True
                else:
                    self.log_result(f"Delete {collection_name} Item", False, 
                                  f"API returned success=false: {data.get('message', 'Unknown error')}")
                    return False
            else:
                self.log_result(f"Delete {collection_name} Item", False, 
                              f"Failed with status {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_result(f"Delete {collection_name} Item", False, f"Exception: {str(e)}")
            return False
    
    def test_error_scenarios(self):
        """Test various error scenarios"""
        # Test getting non-existent item
        try:
            fake_id = str(uuid.uuid4())
            response = requests.get(f"{self.base_url}/admin/news_articles/{fake_id}", timeout=10)
            if response.status_code == 404:
                self.log_result("Error Handling - Nonexistent Item", True, 
                              "Correctly returned 404 for non-existent item")
            else:
                self.log_result("Error Handling - Nonexistent Item", False, 
                              f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Nonexistent Item", False, f"Exception: {str(e)}")
        
        # Test updating non-existent item
        try:
            fake_id = str(uuid.uuid4())
            response = requests.put(
                f"{self.base_url}/admin/news_articles/{fake_id}",
                json={'title': 'Test Update'},
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            if response.status_code == 404:
                self.log_result("Error Handling - Update Nonexistent", True, 
                              "Correctly returned 404 for updating non-existent item")
            else:
                self.log_result("Error Handling - Update Nonexistent", False, 
                              f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Update Nonexistent", False, f"Exception: {str(e)}")
        
        # Test deleting non-existent item
        try:
            fake_id = str(uuid.uuid4())
            response = requests.delete(f"{self.base_url}/admin/news_articles/{fake_id}", timeout=10)
            if response.status_code == 404:
                self.log_result("Error Handling - Delete Nonexistent", True, 
                              "Correctly returned 404 for deleting non-existent item")
            else:
                self.log_result("Error Handling - Delete Nonexistent", False, 
                              f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Error Handling - Delete Nonexistent", False, f"Exception: {str(e)}")
    
    def run_comprehensive_tests(self):
        """Run all tests for all collections"""
        print(f"🚀 Starting comprehensive War:Observe Admin API testing...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 80)
        
        # Health check first
        if not self.test_health_check():
            print("❌ API health check failed. Aborting tests.")
            return
        
        # Test collections info
        collections = self.test_get_collections_info()
        
        # Test invalid collection
        self.test_get_nonexistent_collection()
        
        # Test each collection
        collections_to_test = [
            'news_articles', 'team_members', 'research_projects', 
            'partners', 'resources', 'job_openings', 
            'testimonials', 'faq', 'donations'
        ]
        
        for collection_name in collections_to_test:
            print(f"\n📋 Testing {collection_name}...")
            
            # Get existing data
            existing_items = self.test_get_collection_data(collection_name)
            
            # Create new item
            created_item = self.test_create_item(collection_name)
            
            if created_item:
                item_id = created_item.get('id') or created_item.get('_id')
                
                # Get item by ID
                retrieved_item = self.test_get_item_by_id(collection_name, item_id)
                
                if retrieved_item:
                    # Update item
                    updated_item = self.test_update_item(collection_name, item_id, retrieved_item)
                    
                    # Delete item
                    self.test_delete_item(collection_name, item_id)
        
        # Test error scenarios
        print(f"\n🔍 Testing error scenarios...")
        self.test_error_scenarios()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)

if __name__ == "__main__":
    tester = WarObserveAPITester()
    tester.run_comprehensive_tests()