import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.timeout = 10000;

// API Response handler
const handleApiResponse = (response) => response.data;
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    throw new Error(error.response.data.detail || 'An error occurred');
  } else if (error.request) {
    throw new Error('Network error - please check your connection');
  } else {
    throw new Error('An unexpected error occurred');
  }
};

// News Articles API
export const newsAPI = {
  getAll: async (page = 1, limit = 10, category = null) => {
    try {
      const params = { skip: (page - 1) * limit, limit };
      if (category) params.category = category;
      
      const response = await axios.get(`${API_BASE}/news`, { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/news/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getByCategory: async (category, page = 1, limit = 10) => {
    try {
      const params = { skip: (page - 1) * limit, limit };
      const response = await axios.get(`${API_BASE}/news/category/${category}`, { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Team Members API
export const teamAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/team`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/team/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Research Projects API
export const researchAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/research`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/research/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getByStatus: async (status) => {
    try {
      const response = await axios.get(`${API_BASE}/research/status/${status}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Partners API
export const partnersAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/partners`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Resources API
export const resourcesAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/resources`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  download: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/resources/download/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Job Openings API
export const jobsAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/jobs`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/jobs/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  apply: async (jobId, applicationData) => {
    try {
      const response = await axios.post(`${API_BASE}/jobs/${jobId}/apply`, applicationData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    try {
      const response = await axios.post(`${API_BASE}/contact`, contactData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/testimonials`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// FAQ API
export const faqAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE}/faq`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Donations API
export const donationsAPI = {
  getTiers: async () => {
    try {
      const response = await axios.get(`${API_BASE}/donation-tiers`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
  
  donate: async (donationData) => {
    try {
      const response = await axios.post(`${API_BASE}/donate`, donationData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Health Check API
export const healthAPI = {
  check: async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Utility function to test API connection
export const testConnection = async () => {
  try {
    await healthAPI.check();
    return true;
  } catch (error) {
    console.error('API connection failed:', error);
    return false;
  }
};