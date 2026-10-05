// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// App name
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Reliable Insurance'

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// Local storage keys
export const TOKEN_KEY = 'token'
export const USER_KEY  = 'user'

// Route paths
export const ROUTES = {
  LOGIN:            '/login',
  FORGOT_PASSWORD:  '/forgot-password',
  RESET_PASSWORD:   '/reset-password',
  DASHBOARD:        '/',
  CUSTOMERS:        '/customers',
  VEHICLES:         '/vehicles',
  POLICIES:         '/policies',
  TRANSACTIONS:     '/transactions',
  QUOTATIONS:       '/quotations',
  CLAIMS:           '/claims',
  PAYMENTS:         '/payments',
  COMMISSIONS:      '/commissions',
  AGENTS:           '/agents',
  FRANCHISES:       '/franchises',
  ACCOUNTS:         '/accounts',
  REPORTS:          '/reports',
}
