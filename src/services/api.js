const API_BASE = 'http://localhost:5000/api';

// Helper for HTTP requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('shreelata_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'An error occurred' }));
      throw new Error(err.error || `HTTP error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMe: () => request('/auth/me'),

  // Stats
  getStats: () => request('/stats'),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured) query.append('featured', 'true');
    if (params.best_seller) query.append('best_seller', 'true');
    if (params.new_arrival) query.append('new_arrival', 'true');
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/products${queryString}`);
  },
  getProductById: (id) => request(`/products/${id}`),
  createProduct: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  // Hero Slides
  getSlides: () => request('/slides'),
  createSlide: (data) => request('/slides', { method: 'POST', body: JSON.stringify(data) }),
  updateSlide: (id, data) => request(`/slides/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSlide: (id) => request(`/slides/${id}`, { method: 'DELETE' }),

  // Multi Image Upload
  uploadImages: async (files) => {
    const token = localStorage.getItem('shreelata_token');
    const formData = new FormData();
    for (const file of files) {
      formData.append('images', file);
    }

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload images');
    }

    return await res.json(); // { urls: [...] }
  }
};
