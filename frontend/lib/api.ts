const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Handle unauthorized (maybe redirect to login or refresh token)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      // window.location.href = '/login'
    }
  }

  return response
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (response.ok) {
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    return { success: true, data }
  } else {
    return { success: false, error: data.detail || 'Login failed' }
  }
}

export async function signup(email: string, password: string, fullName: string) {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name: fullName }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: true, data }
  } else {
    return { success: false, error: data.email?.[0] || data.detail || 'Signup failed' }
  }
}

export async function getTransactions() {
  const response = await apiFetch('/api/finance/records/')
  if (!response.ok) return []
  return response.json()
}

export async function createTransaction(data: any) {
  const response = await apiFetch('/api/finance/records/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getDashboardSummary() {
  const response = await apiFetch('/api/dashboard/summary/')
  if (!response.ok) return null
  return response.json()
}

export async function getDashboardTrends() {
  const response = await apiFetch('/api/dashboard/trends/')
  if (!response.ok) return []
  return response.json()
}

export async function getDashboardByCategory() {
  const response = await apiFetch('/api/dashboard/by-category/')
  if (!response.ok) return []
  return response.json()
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
