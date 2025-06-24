import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface RealTimeContextType {
  isConnected: boolean
  agentUpdates: any[]
  systemAlerts: any[]
  lastUpdate: string | null
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined)

export const RealTimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected] = useState(false)
  const [agentUpdates] = useState<any[]>([])
  const [systemAlerts] = useState<any[]>([])
  const [lastUpdate] = useState<string | null>(null)

  return (
    <RealTimeContext.Provider value={{
      isConnected,
      agentUpdates,
      systemAlerts,
      lastUpdate
    }}>
      {children}
    </RealTimeContext.Provider>
  )
}

export const useRealTime = () => {
  const context = useContext(RealTimeContext)
  if (!context) {
    throw new Error('useRealTime must be used within RealTimeProvider')
  }
  return context
}