import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import KitchenDashboard from './pages/KitchenDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import BusinessDashboard from './pages/BusinessDashboard'
import LogisticsDashboard from './pages/LogisticsDashboard'
import AgentsDashboard from './pages/AgentsDashboard'
import { RealTimeProvider } from './contexts/RealTimeContext'
import { kitchenAPI } from './services/api'
import './App.css'

type DashboardType = 'kitchen' | 'customer' | 'business' | 'logistics' | 'agents'

function App() {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>('kitchen')
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  // Check backend connection on startup
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await kitchenAPI.healthCheck()
        setBackendStatus('connected')
        console.log('✅ Kitchen AI backend is running')
      } catch (error) {
        setBackendStatus('disconnected')
        console.log('⚠️ Kitchen AI backend not detected')
      }
    }
    
    checkBackend()
  }, [])

  const renderDashboard = () => {
    switch (currentDashboard) {
      case 'kitchen':
        return <KitchenDashboard />
      case 'customer':
        return <CustomerDashboard />
      case 'business':
        return <BusinessDashboard />
      case 'logistics':
        return <LogisticsDashboard />
      case 'agents':
        return <AgentsDashboard />
      default:
        return <KitchenDashboard />
    }
  }

  return (
    <RealTimeProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Backend Status Banner */}
        {backendStatus === 'disconnected' && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ <strong>Kitchen AI Backend Not Connected</strong> - Frontend is using mock data. 
                  Start your backend for real agent responses.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="text-xs font-medium text-yellow-700 hover:text-yellow-900 underline transition-colors duration-200"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {backendStatus === 'connected' && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-3 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-800">
                ✅ <strong>Kitchen AI Backend Connected</strong> - Real agent responses active
              </p>
            </div>
          </div>
        )}

        <Layout 
          currentDashboard={currentDashboard} 
          onDashboardChange={(dashboard) => setCurrentDashboard(dashboard as DashboardType)}
        >
          {renderDashboard()}
        </Layout>
      </div>
    </RealTimeProvider>
  )
}

export default App