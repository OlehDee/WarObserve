import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  Database,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

const AdminPanel = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load collections info on component mount
  useEffect(() => {
    loadCollections();
  }, []);

  // Load collection data when selection changes
  useEffect(() => {
    if (selectedCollection) {
      loadCollectionData();
    }
  }, [selectedCollection]);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/admin/collections`);
      setCollections(response.data.collections);
      if (response.data.collections.length > 0) {
        setSelectedCollection(response.data.collections[0].name);
      }
    } catch (error) {
      showMessage('error', 'Failed to load collections: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCollectionData = async () => {
    if (!selectedCollection) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/admin/${selectedCollection}?limit=100`);
      setData(response.data.data);
    } catch (error) {
      showMessage('error', 'Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleEdit = (item) => {
    setEditingItem({...item});
    setShowCreateForm(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const itemId = editingItem.id || editingItem._id;
      const updateData = {...editingItem};
      delete updateData._id;
      
      await axios.put(`${API_BASE}/admin/${selectedCollection}/${itemId}`, updateData);
      setEditingItem(null);
      await loadCollectionData();
      showMessage('success', 'Item updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to update item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newItem) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/admin/${selectedCollection}`, newItem);
      setShowCreateForm(false);
      await loadCollectionData();
      showMessage('success', 'Item created successfully!');
    } catch (error) {
      showMessage('error', 'Failed to create item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setLoading(true);
      const itemId = item.id || item._id;
      await axios.delete(`${API_BASE}/admin/${selectedCollection}/${itemId}`);
      await loadCollectionData();
      showMessage('success', 'Item deleted successfully!');
    } catch (error) {
      showMessage('error', 'Failed to delete item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return Object.values(item).some(value => 
      value && value.toString().toLowerCase().includes(searchLower)
    );
  });

  const renderField = (key, value, isEditing = false) => {
    if (key === '_id' || key === 'id' || key === 'createdAt' || key === 'updatedAt') {
      return <span className="text-gray-500 text-sm">{value}</span>;
    }

    if (isEditing) {
      if (typeof value === 'boolean') {
        return (
          <select
            value={value.toString()}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [key]: e.target.value === 'true'
            })}
            className="w-full p-2 border rounded"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      } else if (Array.isArray(value)) {
        return (
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : ''}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [key]: e.target.value.split(',').map(item => item.trim())
            })}
            className="w-full p-2 border rounded"
            placeholder="Comma-separated values"
          />
        );
      } else if (key.includes('Date') || key.includes('At')) {
        return (
          <input
            type="datetime-local"
            value={value ? new Date(value).toISOString().slice(0, 16) : ''}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [key]: e.target.value ? new Date(e.target.value).toISOString() : ''
            })}
            className="w-full p-2 border rounded"
          />
        );
      } else if (key === 'content' || key === 'description' || key === 'bio') {
        return (
          <textarea
            value={value || ''}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [key]: e.target.value
            })}
            className="w-full p-2 border rounded h-32"
            rows={4}
          />
        );
      } else {
        return (
          <input
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value || ''}
            onChange={(e) => setEditingItem({
              ...editingItem,
              [key]: e.target.value
            })}
            className="w-full p-2 border rounded"
          />
        );
      }
    } else {
      if (typeof value === 'boolean') {
        return <span className={value ? 'text-green-600' : 'text-red-600'}>{value ? 'Yes' : 'No'}</span>;
      } else if (Array.isArray(value)) {
        return <span className="text-blue-600">[{value.join(', ')}]</span>;
      } else if (key.includes('Date') || key.includes('At')) {
        return <span className="text-gray-600">{value ? new Date(value).toLocaleDateString() : 'N/A'}</span>;
      } else if (key.includes('Url') || key.includes('image')) {
        return <span className="text-blue-500 underline">{value}</span>;
      } else {
        const displayValue = value ? value.toString() : 'N/A';
        return (
          <span className={displayValue.length > 100 ? 'text-sm' : ''}>
            {displayValue.length > 100 ? displayValue.substring(0, 100) + '...' : displayValue}
          </span>
        );
      }
    }
  };

  const CreateForm = () => {
    const [newItem, setNewItem] = useState({});
    
    const getFieldTemplate = () => {
      if (data.length === 0) return {};
      const sampleItem = data[0];
      const template = {};
      Object.keys(sampleItem).forEach(key => {
        if (!['_id', 'id', 'createdAt', 'updatedAt'].includes(key)) {
          template[key] = '';
        }
      });
      return template;
    };

    const template = getFieldTemplate();

    return (
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-bold mb-4">Create New Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(template).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{key}</label>
              {renderField(key, newItem[key] || template[key], true, newItem, setNewItem)}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => handleCreate(newItem)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            <Save size={16} className="inline mr-2" />
            Create
          </button>
          <button 
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <X size={16} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Database className="mr-3" size={32} />
              War:Observe Admin Panel
            </h1>
            <button
              onClick={loadCollectionData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              disabled={loading}
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle size={16} className="mr-2" /> : <AlertCircle size={16} className="mr-2" />}
            {message.text}
          </div>
        )}

        {/* Collection Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">Select Collection:</label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                {collections.map(col => (
                  <option key={col.name} value={col.name}>
                    {col.display_name} ({col.count} items)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium mb-2">Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items..."
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add New
              </button>
            </div>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && <CreateForm />}

        {/* Data Table */}
        {loading && <div className="text-center py-8">Loading...</div>}
        
        {!loading && filteredData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(filteredData[0]).map(key => (
                      <th key={key} className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                        {key}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={item.id || item._id || index} className="hover:bg-gray-50">
                      {Object.entries(item).map(([key, value]) => (
                        <td key={key} className="px-4 py-3">
                          {editingItem && (editingItem.id === item.id || editingItem._id === item._id) 
                            ? renderField(key, editingItem[key], true)
                            : renderField(key, value, false)
                          }
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          {editingItem && (editingItem.id === item.id || editingItem._id === item._id) ? (
                            <>
                              <button
                                onClick={handleSave}
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                title="Save"
                                disabled={loading}
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={() => setEditingItem(null)}
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item)}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                title="Delete"
                                disabled={loading}
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && filteredData.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            No items found
          </div>
        )}
      </div>
    </div>
  );
};

// Simple CreateForm helper
const renderFieldForCreate = (key, value, newItem, setNewItem) => {
  if (key.includes('Date') || key.includes('At')) {
    return (
      <input
        type="datetime-local"
        value={newItem[key] || ''}
        onChange={(e) => setNewItem({
          ...newItem,
          [key]: e.target.value
        })}
        className="w-full p-2 border rounded"
      />
    );
  } else if (key === 'content' || key === 'description' || key === 'bio') {
    return (
      <textarea
        value={newItem[key] || ''}
        onChange={(e) => setNewItem({
          ...newItem,
          [key]: e.target.value
        })}
        className="w-full p-2 border rounded h-32"
        rows={4}
      />
    );
  } else {
    return (
      <input
        type="text"
        value={newItem[key] || ''}
        onChange={(e) => setNewItem({
          ...newItem,
          [key]: e.target.value
        })}
        className="w-full p-2 border rounded"
      />
    );
  }
};

export default AdminPanel;