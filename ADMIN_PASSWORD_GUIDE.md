# 🔐 Керування паролем адміністратора War:OBSERVE

## 📋 Поточні налаштування

**Поточний пароль:** `warobserve2024!`

## 🔧 Способи зміни паролю

### Метод 1: Через інтерфейс (рекомендується)
1. Перейдіть на `/admin` 
2. Увійдіть з поточним паролем
3. Натисніть кнопку **"Змінити пароль"** у верхньому червоному банері
4. Заповніть форму:
   - Поточний пароль
   - Новий пароль (мінімум 8 символів)  
   - Підтвердження нового паролю
5. Система покаже новий пароль і інструкцію для оновлення коду

### Метод 2: Прямо в коді
1. Відкрийте файл: `/app/frontend/src/components/AdminLogin.js`
2. Знайдіть лінію 11: `const ADMIN_PASSWORD = 'warobserve2024!';`
3. Замініть пароль на новий
4. Збережіть файл
5. Перезапустіть frontend: `sudo supervisorctl restart frontend`

## 🆘 Відновлення доступу

### Якщо забули пароль:
1. **Через файл конфігурації:**
   ```bash
   nano /app/frontend/src/components/AdminLogin.js
   # Змініть лінію 11 на новий пароль
   sudo supervisorctl restart frontend
   ```

2. **Через localStorage (тимчасово):**
   ```javascript
   // В браузері на сторінці сайту:
   localStorage.setItem('warobserve_admin_auth', 'authenticated')
   // Потім перейдіть на /admin
   ```

### Якщо адмін панель не працює:
1. Перевірте чи працює frontend: `sudo supervisorctl status frontend`
2. Перевірте логи: `tail -f /var/log/supervisor/frontend.*.log`
3. Перезапустіть сервіс: `sudo supervisorctl restart frontend`

## 🔒 Безпека

### Рекомендації:
- Використовуйте складний пароль (мінімум 8 символів)
- Включіть цифри, букви та спеціальні символи
- Не діліться паролем
- Регулярно змінюйте пароль

### Примери надійних паролів:
- `WarObserve2024!@#`
- `Secure!ng0123`  
- `Adm1n@War2024`

## 📁 Важливі файли:

- **Логіка паролю:** `/app/frontend/src/components/AdminLogin.js`
- **Захищена панель:** `/app/frontend/src/components/ProtectedAdminPanel.js`
- **Менеджер паролів:** `/app/frontend/src/components/PasswordManager.js`

## 🔄 Автоматичне відновлення

У разі критичних проблем можна скинути всю аутентифікацію:
```bash
# Видалити localStorage в браузері
localStorage.clear()

# Або скинути до дефолтного паролю в коді
sed -i 's/const ADMIN_PASSWORD = .*/const ADMIN_PASSWORD = "warobserve2024!";/' /app/frontend/src/components/AdminLogin.js
sudo supervisorctl restart frontend
```

---
**Дата створення:** 20 липня 2025  
**Версія:** 1.0