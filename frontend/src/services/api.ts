const API_BASE_URL = '/api';

const getAuthToken = () => localStorage.getItem('token');

const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'Failed to fetch');
  }

  return await response.json();
};

export const getProducts = () => apiFetch('/products');

export const getCategories = () => apiFetch('/categories');

export const login = (credentials: any) => apiFetch('/users/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const register = (userInfo: any) => apiFetch('/users/register', {
  method: 'POST',
  body: JSON.stringify(userInfo),
});

export const getMe = () => apiFetch('/users/me');

export const checkout = (checkoutData: any) => apiFetch('/orders/checkout', {
  method: 'POST',
  body: JSON.stringify(checkoutData),
});

export const getOrderHistory = () => apiFetch('/orders');

export const trackOrder = (trackingNumber: string) => apiFetch(`/orders/track/${trackingNumber}`);
