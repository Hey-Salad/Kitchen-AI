import axios from 'axios'

// Backend API configuration
const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

// Kitchen AI API endpoints
export const kitchenAPI = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/')
    return response.data
  },

  // Get system status
  getSystemStatus: async () => {
    const response = await api.get('/api/status')
    return response.data
  },

  // Send voice command to agents
  sendVoiceCommand: async (transcript: string, agentId?: string) => {
    const response = await api.post('/api/voice-command', {
      transcript,
      agent_id: agentId
    })
    return response.data
  },

  // Upload and analyze image
  analyzeImage: async (imageFile: File) => {
    const formData = new FormData()
    formData.append('image_file', imageFile)

    const response = await api.post('/api/camera-capture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get specific agent status
  getAgentStatus: async (agentId: string) => {
    const response = await api.get(`/api/agents/${agentId}/status`)
    return response.data
  }
}

export default api
