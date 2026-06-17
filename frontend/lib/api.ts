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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response
}

export async function login(email: string, password: string) {
  try {
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
  } catch (err) {
    return { success: false, error: 'Network error' }
  }
}

export async function signup(email: string, password: string, fullName: string) {
  try {
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
  } catch (err) {
    return { success: false, error: 'Network error' }
  }
}

export async function getTransactions() {
  try {
    const response = await apiFetch('/api/finance/records/')
    return response.json()
  } catch (err) {
    console.error('getTransactions error:', err)
    return []
  }
}

export async function createTransaction(data: any) {
  const response = await apiFetch('/api/finance/records/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getDashboardSummary() {
  try {
    const response = await apiFetch('/api/dashboard/summary/')
    return response.json()
  } catch (err) {
    console.error('getDashboardSummary error:', err)
    return null
  }
}

export async function getDashboardTrends() {
  try {
    const response = await apiFetch('/api/dashboard/trends/')
    return response.json()
  } catch (err) {
    console.error('getDashboardTrends error:', err)
    return []
  }
}

export async function getDashboardByCategory() {
  try {
    const response = await apiFetch('/api/dashboard/by-category/')
    return response.json()
  } catch (err) {
    console.error('getDashboardByCategory error:', err)
    return []
  }
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
