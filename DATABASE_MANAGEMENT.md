# 📊 Керування базою даних War:Observe

Ваш проект має два способи редагування бази даних:

## 🌐 Веб-інтерфейс (Рекомендується)

**Адреса:** http://localhost:3000/admin

### Можливості:
- ✅ Перегляд всіх колекцій
- ✅ Редагування записів в реальному часі
- ✅ Додавання нових записів
- ✅ Видалення записів
- ✅ Пошук по контенту
- ✅ Зручний інтерфейс

### Інструкція:
1. Відкрийте браузер і перейдіть на http://localhost:3000/admin
2. Виберіть колекцію зі списку (Новини, Команда, Дослідження, тощо)
3. Використовуйте кнопки Edit/Delete для зміни існуючих записів
4. Натисніть "Add New" щоб додати новий запис
5. Використовуйте пошук для знаходження конкретних записів

---

## 🖥️ Консольний інструмент

**Запуск:** 
```bash
cd /app
python3 database_manager.py
```

### Можливості:
- ✅ Повне керування всіма колекціями
- ✅ Детальний перегляд структури даних
- ✅ Пошук і фільтрація
- ✅ Додавання/редагування/видалення

### Інструкція:
1. Запустіть скрипт в терміналі
2. Виберіть номер колекції (1-9)
3. Виберіть дію: перегляд, додавання, редагування, видалення
4. Слідуйте інтерактивним підказкам

---

## 📝 Колекції в базі даних:

1. **news_articles** (Новини)
   - title, excerpt, content, author, publishedDate, category, imageUrl, tags

2. **team_members** (Команда)
   - name, position, email, image, bio, joinDate

3. **research_projects** (Дослідження)
   - title, description, status, startDate, endDate, teamLead, technologies

4. **partners** (Партнери)
   - name, description, website, logo, type

5. **resources** (Ресурси)
   - title, description, fileUrl, type, category, downloadCount

6. **job_openings** (Вакансії)
   - title, description, requirements, location, type, salary

7. **testimonials** (Відгуки)
   - clientName, clientPosition, content, rating, projectType

8. **faq** (FAQ)
   - question, answer, category, order

9. **donations** (Донації)
   - donorName, donorEmail, amount, tier, status

---

## 🔑 API Endpoints для розробників:

### Загальна інформація:
```
GET /api/admin/collections - список всіх колекцій
```

### Робота з конкретною колекцією:
```
GET /api/admin/{collection_name}           - отримати всі записи
GET /api/admin/{collection_name}/{id}      - отримати запис по ID
POST /api/admin/{collection_name}          - створити новий запис
PUT /api/admin/{collection_name}/{id}      - оновити запис
DELETE /api/admin/{collection_name}/{id}   - видалити запис
```

### Приклад використання:
```bash
# Отримати всі новини
curl http://localhost:8001/api/admin/news_articles

# Створити нову новину
curl -X POST http://localhost:8001/api/admin/news_articles \
  -H "Content-Type: application/json" \
  -d '{"title": "Нова стаття", "excerpt": "Короткий опис", "content": "Повний текст...", "author": "Автор", "publishedDate": "2024-01-01T00:00:00", "category": "News", "imageUrl": "http://example.com/image.jpg"}'
```

---

## ⚡ Швидкий старт:

1. **Для швидкого редагування** → перейдіть на http://localhost:3000/admin
2. **Для детального керування** → запустіть `python3 database_manager.py`
3. **Для автоматизації** → використовуйте API endpoints

---

## 🆘 Потрібна допомога?

- Всі зміни в базі даних негайно відображаються на сайті
- Резервні копії створюються автоматично
- При помилках перевірте логи: `sudo supervisorctl tail -f backend`

**Зауваження:** Веб-адмінка найзручніша для повсякденного використання! 🎯