#!/usr/bin/env python3
"""
📊 Database Manager для War:Observe
Інструмент для редагування контенту сайту
"""
import asyncio
import json
from datetime import datetime
from backend.database import (
    news_articles_crud, team_members_crud, research_projects_crud,
    partners_crud, resources_crud, job_openings_crud, 
    testimonials_crud, faqs_crud, donations_crud, database
)

class DatabaseManager:
    def __init__(self):
        self.collections = {
            '1': ('news_articles', news_articles_crud, 'Новини'),
            '2': ('team_members', team_members_crud, 'Команда'), 
            '3': ('research_projects', research_projects_crud, 'Дослідження'),
            '4': ('partners', partners_crud, 'Партнери'),
            '5': ('resources', resources_crud, 'Ресурси'),
            '6': ('job_openings', job_openings_crud, 'Вакансії'),
            '7': ('testimonials', testimonials_crud, 'Відгуки'),
            '8': ('faq', faqs_crud, 'FAQ'),
            '9': ('donations', donations_crud, 'Донації')
        }

    async def show_menu(self):
        """Головне меню"""
        print("\n" + "="*50)
        print("🎯 WAR:OBSERVE DATABASE MANAGER")
        print("="*50)
        print("Виберіть колекцію для роботи:")
        
        for key, (col_name, crud, display_name) in self.collections.items():
            count = await database.db[col_name].count_documents({})
            print(f"{key}. {display_name} ({count} записів)")
        
        print("\n0. Вихід")
        print("h. Показати структуру всіх колекцій")

    async def show_collection_structure(self):
        """Показати структуру всіх колекцій"""
        print("\n📋 СТРУКТУРА КОЛЕКЦІЙ:")
        structures = {
            'news_articles': ['title', 'excerpt', 'content', 'author', 'publishedDate', 'category', 'imageUrl', 'tags'],
            'team_members': ['name', 'position', 'email', 'image', 'bio', 'joinDate'],
            'research_projects': ['title', 'description', 'status', 'startDate', 'endDate', 'teamLead', 'technologies'],
            'partners': ['name', 'description', 'website', 'logo', 'type'],
            'resources': ['title', 'description', 'fileUrl', 'type', 'category', 'downloadCount'],
            'job_openings': ['title', 'description', 'requirements', 'location', 'type', 'salary'],
            'testimonials': ['clientName', 'clientPosition', 'content', 'rating', 'projectType'],
            'faq': ['question', 'answer', 'category', 'order'],
            'donations': ['donorName', 'donorEmail', 'amount', 'tier', 'status']
        }
        
        for col_name, fields in structures.items():
            print(f"\n🔹 {col_name}:")
            print("   Поля: " + ", ".join(fields))

    async def manage_collection(self, collection_key):
        """Керування конкретною колекцією"""
        if collection_key not in self.collections:
            print("❌ Невірний вибір!")
            return
        
        col_name, crud, display_name = self.collections[collection_key]
        
        while True:
            print(f"\n📁 Керування: {display_name}")
            print("-" * 30)
            print("1. Показати всі записи")
            print("2. Додати новий запис")
            print("3. Редагувати запис")
            print("4. Видалити запис")
            print("5. Пошук записів")
            print("0. Повернутися до головного меню")
            
            choice = input("\nВаш вибір: ").strip()
            
            if choice == '0':
                break
            elif choice == '1':
                await self.show_all_records(crud, display_name)
            elif choice == '2':
                await self.add_record(crud, col_name, display_name)
            elif choice == '3':
                await self.edit_record(crud, display_name)
            elif choice == '4':
                await self.delete_record(crud, display_name)
            elif choice == '5':
                await self.search_records(crud, display_name)
            else:
                print("❌ Невірний вибір!")

    async def show_all_records(self, crud, display_name):
        """Показати всі записи"""
        try:
            records = await crud.get_all(limit=50)
            print(f"\n📋 Всі записи в {display_name}:")
            print("-" * 50)
            
            if not records:
                print("📭 Немає записів")
                return
            
            for i, record in enumerate(records, 1):
                # Показуємо основну інформацію
                print(f"\n{i}. ID: {record.get('id', record.get('_id'))}")
                
                if 'title' in record:
                    print(f"   Назва: {record['title']}")
                elif 'name' in record:
                    print(f"   Ім'я: {record['name']}")
                elif 'question' in record:
                    print(f"   Питання: {record['question'][:50]}...")
                elif 'donorName' in record:
                    print(f"   Донор: {record['donorName']} - €{record['amount']}")
                
                if 'createdAt' in record:
                    print(f"   Створено: {record['createdAt']}")
                    
        except Exception as e:
            print(f"❌ Помилка: {e}")

    async def add_record(self, crud, col_name, display_name):
        """Додати новий запис"""
        print(f"\n➕ Додавання нового запису в {display_name}")
        
        # Шаблони для різних типів записів
        templates = await self.get_record_template(col_name)
        
        if not templates:
            print("❌ Шаблон для цієї колекції не знайдено")
            return
        
        print("\n📝 Заповніть поля (Enter для пропуску необов'язкових полів):")
        new_record = {}
        
        for field, (field_type, required, default_value) in templates.items():
            while True:
                prompt = f"{field} ({field_type})"
                if required:
                    prompt += " *обов'язково*"
                if default_value:
                    prompt += f" [default: {default_value}]"
                prompt += ": "
                
                value = input(prompt).strip()
                
                if not value and default_value:
                    value = default_value
                
                if required and not value:
                    print("❌ Це поле обов'язкове!")
                    continue
                
                if value:
                    # Конвертація типів
                    if field_type == 'datetime' and value:
                        try:
                            value = datetime.fromisoformat(value.replace('Z', '+00:00'))
                        except:
                            try:
                                value = datetime.strptime(value, '%Y-%m-%d')
                            except:
                                print("❌ Невірний формат дати. Використайте YYYY-MM-DD")
                                continue
                    elif field_type == 'list' and value:
                        value = [item.strip() for item in value.split(',')]
                    elif field_type == 'int' and value:
                        try:
                            value = int(value)
                        except:
                            print("❌ Має бути число")
                            continue
                    elif field_type == 'float' and value:
                        try:
                            value = float(value)
                        except:
                            print("❌ Має бути число з комою")
                            continue
                    elif field_type == 'bool' and value:
                        value = value.lower() in ('true', 'yes', '1', 'так')
                
                new_record[field] = value
                break
        
        try:
            result = await crud.create(new_record)
            print(f"✅ Запис успішно створено! ID: {result.get('id', result.get('_id'))}")
        except Exception as e:
            print(f"❌ Помилка створення: {e}")

    async def edit_record(self, crud, display_name):
        """Редагувати запис"""
        record_id = input(f"\n✏️ Введіть ID запису для редагування в {display_name}: ").strip()
        
        try:
            record = await crud.get_by_id(record_id)
            if not record:
                print("❌ Запис не знайдено!")
                return
            
            print("\n📋 Поточні дані:")
            for key, value in record.items():
                if key not in ['_id', 'createdAt', 'updatedAt']:
                    print(f"   {key}: {value}")
            
            print("\n✏️ Введіть нові значення (Enter для збереження поточного):")
            updates = {}
            
            for key, value in record.items():
                if key not in ['_id', 'id', 'createdAt', 'updatedAt']:
                    new_value = input(f"{key} [{value}]: ").strip()
                    if new_value:
                        # Простий парсинг типів
                        if isinstance(value, bool):
                            new_value = new_value.lower() in ('true', 'yes', '1', 'так')
                        elif isinstance(value, int):
                            try:
                                new_value = int(new_value)
                            except:
                                print(f"❌ Невірне число для {key}, пропускаю")
                                continue
                        elif isinstance(value, float):
                            try:
                                new_value = float(new_value)
                            except:
                                print(f"❌ Невірне число для {key}, пропускаю")
                                continue
                        elif isinstance(value, list):
                            new_value = [item.strip() for item in new_value.split(',')]
                        
                        updates[key] = new_value
            
            if updates:
                await crud.update(record_id, updates)
                print("✅ Запис оновлено!")
            else:
                print("ℹ️ Жодних змін не внесено")
                
        except Exception as e:
            print(f"❌ Помилка: {e}")

    async def delete_record(self, crud, display_name):
        """Видалити запис"""
        record_id = input(f"\n🗑️ Введіть ID запису для видалення з {display_name}: ").strip()
        
        try:
            record = await crud.get_by_id(record_id)
            if not record:
                print("❌ Запис не знайдено!")
                return
            
            # Показуємо що будемо видаляти
            print("\n⚠️ Ви збираєтеся видалити:")
            for key, value in record.items():
                if key in ['title', 'name', 'question', 'donorName']:
                    print(f"   {key}: {value}")
            
            confirm = input("\n❓ Підтвердити видалення? (yes/так): ").strip().lower()
            if confirm in ('yes', 'так', 'y'):
                success = await crud.delete(record_id)
                if success:
                    print("✅ Запис видалено!")
                else:
                    print("❌ Помилка видалення")
            else:
                print("ℹ️ Видалення скасовано")
                
        except Exception as e:
            print(f"❌ Помилка: {e}")

    async def search_records(self, crud, display_name):
        """Пошук записів"""
        query = input(f"\n🔍 Введіть пошуковий запит для {display_name}: ").strip()
        
        if not query:
            print("❌ Пустий запит!")
            return
        
        try:
            # Визначаємо поля для пошуку
            search_fields = ['title', 'name', 'content', 'description', 'question']
            results = await crud.search(query, search_fields, limit=20)
            
            print(f"\n🔍 Результати пошуку '{query}':")
            print("-" * 50)
            
            if not results:
                print("📭 Нічого не знайдено")
                return
            
            for i, record in enumerate(results, 1):
                print(f"\n{i}. ID: {record.get('id', record.get('_id'))}")
                if 'title' in record:
                    print(f"   Назва: {record['title']}")
                elif 'name' in record:
                    print(f"   Ім'я: {record['name']}")
                elif 'question' in record:
                    print(f"   Питання: {record['question']}")
                    
        except Exception as e:
            print(f"❌ Помилка пошуку: {e}")

    async def get_record_template(self, col_name):
        """Отримати шаблон для створення нового запису"""
        templates = {
            'news_articles': {
                'title': ('string', True, None),
                'excerpt': ('string', True, None),
                'content': ('string', True, None),
                'author': ('string', True, None),
                'publishedDate': ('datetime', True, None),
                'category': ('string', True, 'Analysis'),
                'imageUrl': ('string', True, None),
                'tags': ('list', False, None)
            },
            'team_members': {
                'name': ('string', True, None),
                'position': ('string', True, None),
                'email': ('string', True, None),
                'image': ('string', True, None),
                'bio': ('string', True, None),
                'joinDate': ('datetime', True, None)
            },
            'research_projects': {
                'title': ('string', True, None),
                'description': ('string', True, None),
                'status': ('string', True, 'active'),
                'startDate': ('datetime', True, None),
                'endDate': ('datetime', False, None),
                'teamLead': ('string', True, None),
                'technologies': ('list', False, None)
            },
            'partners': {
                'name': ('string', True, None),
                'description': ('string', True, None),
                'website': ('string', True, None),
                'logo': ('string', True, None),
                'type': ('string', True, 'Organization')
            },
            'resources': {
                'title': ('string', True, None),
                'description': ('string', True, None),
                'fileUrl': ('string', True, None),
                'type': ('string', True, 'PDF'),
                'category': ('string', True, 'Research'),
                'downloadCount': ('int', False, 0)
            },
            'job_openings': {
                'title': ('string', True, None),
                'description': ('string', True, None),
                'requirements': ('string', True, None),
                'location': ('string', True, 'Remote'),
                'type': ('string', True, 'Full-time'),
                'salary': ('string', False, 'Competitive')
            },
            'testimonials': {
                'clientName': ('string', True, None),
                'clientPosition': ('string', True, None),
                'content': ('string', True, None),
                'rating': ('int', True, 5),
                'projectType': ('string', True, 'Research')
            },
            'faq': {
                'question': ('string', True, None),
                'answer': ('string', True, None),
                'category': ('string', True, 'General'),
                'order': ('int', False, 0)
            },
            'donations': {
                'donorName': ('string', True, None),
                'donorEmail': ('string', True, None),
                'amount': ('float', True, None),
                'tier': ('string', True, 'Supporter')
            }
        }
        
        return templates.get(col_name, {})

    async def run(self):
        """Запуск менеджера"""
        while True:
            await self.show_menu()
            choice = input("\n👉 Ваш вибір: ").strip()
            
            if choice == '0':
                print("👋 До побачення!")
                break
            elif choice == 'h':
                await self.show_collection_structure()
            elif choice in self.collections:
                await self.manage_collection(choice)
            else:
                print("❌ Невірний вибір!")

async def main():
    """Головна функція"""
    manager = DatabaseManager()
    await manager.run()

if __name__ == "__main__":
    asyncio.run(main())