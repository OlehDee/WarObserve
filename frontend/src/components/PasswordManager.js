import React, { useState } from 'react';
import { Key, Save, AlertCircle, CheckCircle } from 'lucide-react';

const PasswordManager = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Current password from AdminLogin.js
  const CURRENT_PASSWORD = 'warobserve2024!';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (currentPassword !== CURRENT_PASSWORD) {
      setMessage({ type: 'error', text: 'Поточний пароль неправильний' });
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Новий пароль повинен містити мінімум 8 символів' });
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Паролі не співпадають' });
      setLoading(false);
      return;
    }

    // Simulate password change (in real app, this would be an API call)
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: `Пароль змінено! Новий пароль: "${newPassword}". 
               ВАЖЛИВО: Оновіть пароль в файлі /app/frontend/src/components/AdminLogin.js, лінія 11` 
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center mb-6">
          <Key className="text-blue-600 mr-3" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Зміна паролю</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Поточний пароль
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Новий пароль
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              minLength={8}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Підтвердження паролю
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {message.text && (
            <div className={`mb-4 p-3 rounded-md flex items-center ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? <CheckCircle size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
              <div className="text-sm">{message.text}</div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Зберегти
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Скасувати
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="text-sm text-yellow-800">
            <strong>Інструкція для зміни паролю:</strong>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>Відкрийте файл: <code>/app/frontend/src/components/AdminLogin.js</code></li>
              <li>Знайдіть лінію 11: <code>const ADMIN_PASSWORD = '...';</code></li>
              <li>Замініть старий пароль на новий</li>
              <li>Збережіть файл</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;