import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Trade {
  id: number;
  pair: string;
  direction: 'BUY' | 'SELL';
  entry_price: number;
  exit_price?: number;
  stop_loss: number;
  take_profit: number;
  position_size: number;
  notes?: string;
  screenshot?: string;
  status: 'OPEN' | 'CLOSED';
  opened_at: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
  risk_reward?: number;
  result_pips?: number;
  result_usd?: number;
}

export interface TradingStats {
  total_profit: number;
  win_rate: number;
  avg_risk_reward: number;
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
}

export interface EquityPoint {
  date: string;
  balance: number;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
  
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Trades API
export const tradesAPI = {
  getTrades: async (params?: {
    pair?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    limit?: number;
    offset?: number;
  }): Promise<Trade[]> => {
    const response = await api.get('/trades/', { params });
    return response.data;
  },
  
  getTrade: async (id: number): Promise<Trade> => {
    const response = await api.get(`/trades/${id}`);
    return response.data;
  },
  
  createTrade: async (trade: Partial<Trade>): Promise<Trade> => {
    const response = await api.post('/trades/', trade);
    return response.data;
  },
  
  updateTrade: async (id: number, trade: Partial<Trade>): Promise<Trade> => {
    const response = await api.put(`/trades/${id}`, trade);
    return response.data;
  },
  
  deleteTrade: async (id: number): Promise<void> => {
    await api.delete(`/trades/${id}`);
  },
  
  closeTrade: async (id: number, exitPrice: number): Promise<Trade> => {
    const response = await api.patch(`/trades/${id}/close?exit_price=${exitPrice}`);
    return response.data;
  },
};

// Stats API
export const statsAPI = {
  getSummary: async (): Promise<TradingStats> => {
    const response = await api.get('/stats/summary');
    return response.data;
  },
  
  getEquityCurve: async (): Promise<EquityPoint[]> => {
    const response = await api.get('/stats/equity_curve');
    return response.data;
  },
};