// lib/api-client.js
// Utility for making authenticated API calls from frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export class APIClient {
  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('neuroroute_token')
    }
    return null
  }

  static headers() {
    const token = this.getToken()
    const headers = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  static async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers(),
        ...options.headers,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('neuroroute_token')
        localStorage.removeItem('neuroroute_user')
        window.location.href = '/auth/login'
      }
      throw new Error(`API Error: ${response.statusText}`)
    }

    try {
      return await response.json()
    } catch {
      return response
    }
  }

  static async get(endpoint) {
    return this.fetch(endpoint, { method: 'GET' })
  }

  static async post(endpoint, data) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async put(endpoint, data) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  static async delete(endpoint) {
    return this.fetch(endpoint, { method: 'DELETE' })
  }
}

// Example usage in components:
// const analytics = await APIClient.get('/analytics/summary')
// const wallet = await APIClient.post('/wallet/transaction', { ... })
