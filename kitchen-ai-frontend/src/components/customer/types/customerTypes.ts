// src/components/customer/types/customerTypes.ts

export interface CustomerMetric {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable' | 'warning'
  icon: any
  color: string
  bgColor: string
  status: 'normal' | 'good' | 'excellent' | 'warning'
}

export interface CustomerTicket {
  id: string
  customer: string
  subject: string
  status: 'open' | 'pending' | 'resolved' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created: string
  lastUpdate: string
  agent?: string
  category: string
}

export interface CustomerSatisfactionData {
  period: string
  satisfaction: number
  responseTime: number
  resolution: number
}

export interface SupportChannelData {
  channel: string
  tickets: number
  avgResponseTime: number
  satisfaction: number
  color: string
}

export interface CustomerInteraction {
  id: string
  customer: string
  type: 'call' | 'email' | 'chat' | 'social'
  subject: string
  time: string
  duration?: string
  status: 'active' | 'completed' | 'waiting'
  agent: string
}

export interface AgentPerformanceData {
  agent: string
  ticketsResolved: number
  avgResponseTime: number
  satisfaction: number
  status: 'online' | 'busy' | 'away' | 'offline'
  currentTickets: number
}

export interface CustomerFeedback {
  id: string
  customer: string
  rating: number
  comment: string
  category: string
  time: string
  status: 'new' | 'reviewed' | 'responded'
}