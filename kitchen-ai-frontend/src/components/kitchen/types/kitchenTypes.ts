// src/components/kitchen/types/kitchenTypes.ts

export interface KitchenMetric {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable' | 'warning'
  icon: any
  color: string
  bgColor: string
  status: 'normal' | 'good' | 'excellent' | 'warning'
}

export interface AgentStatus {
  name: string
  status: 'active' | 'idle' | 'busy'
  tasks: number
  efficiency: number
  uptime: string
}

export interface EnvironmentData {
  time: string
  temp: number
  humidity: number
  targetTemp: number
}

export interface OrderFlowData {
  hour: string
  orders: number
  completed: number
  prep_time: number
  target_time: number
}

export interface QualityData {
  time: string
  quality: number
  safety: number
  cleanliness: number
}

export interface RecentActivity {
  time: string
  activity: string
  type: 'success' | 'warning' | 'info'
  agent: string
}

export interface EfficiencyData {
  name: string
  efficiency: number
  fill: string
}