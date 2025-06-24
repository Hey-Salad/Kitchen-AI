// src/pages/KitchenDashboard.tsx

import React from 'react'
import { Activity, Thermometer, Users, AlertTriangle } from 'lucide-react'

// Component imports - adjust paths based on your actual structure
import KitchenMetrics from '../components/kitchen/KitchenMetrics'
import EnvironmentalChart from '../components/kitchen/EnvironmentalChart'
import AgentPerformance from '../components/kitchen/AgentPerformance'
import OrderFlowChart from '../components/kitchen/OrderFlowChart'
import QualityChart from '../components/kitchen/QualityChart'
import QuickActions from '../components/kitchen/QuickActions'
import PerformanceSummary from '../components/kitchen/PerformanceSummary'
import RecentActivity from '../components/kitchen/RecentActivity'
import AgentStatusCards from '../components/kitchen/AgentStatusCards'

// Type imports
import type { 
  KitchenMetric, 
  AgentStatus, 
  EnvironmentData, 
  OrderFlowData, 
  QualityData, 
  RecentActivity as RecentActivityType,
  EfficiencyData 
} from '../components/kitchen/types/kitchenTypes'

const KitchenDashboard: React.FC = () => {
  // Sample data - move this to a service/hook in real implementation
  const metrics: KitchenMetric[] = [
    { 
      title: 'Active Orders', 
      value: '12', 
      change: '+2.1%', 
      trend: 'up',
      icon: Activity, 
      color: 'has-text-info', 
      bgColor: 'has-background-info-light',
      status: 'normal'
    },
    { 
      title: 'Kitchen Temp', 
      value: '5.2°C', 
      change: 'Safe Range', 
      trend: 'stable',
      icon: Thermometer, 
      color: 'has-text-success', 
      bgColor: 'has-background-success-light',
      status: 'good'
    },
    { 
      title: 'Staff Online', 
      value: '4/4', 
      change: '100%', 
      trend: 'up',
      icon: Users, 
      color: 'has-text-primary', 
      bgColor: 'has-background-primary-light',
      status: 'excellent'
    },
    { 
      title: 'Active Alerts', 
      value: '2', 
      change: 'Requires Attention', 
      trend: 'warning',
      icon: AlertTriangle, 
      color: 'has-text-warning', 
      bgColor: 'has-background-warning-light',
      status: 'warning'
    }
  ]

  const agentStatus: AgentStatus[] = [
    { name: 'Sourcing', status: 'active', tasks: 23, efficiency: 92, uptime: '2:34:12' },
    { name: 'Quality', status: 'idle', tasks: 18, efficiency: 88, uptime: '2:34:12' },
    { name: 'Operations', status: 'busy', tasks: 31, efficiency: 95, uptime: '2:34:12' },
    { name: 'Customer', status: 'active', tasks: 15, efficiency: 90, uptime: '2:34:12' }
  ]

  const environmentData: EnvironmentData[] = [
    { time: '06:00', temp: 4.8, humidity: 62, targetTemp: 5.0 },
    { time: '08:00', temp: 5.1, humidity: 64, targetTemp: 5.0 },
    { time: '10:00', temp: 5.3, humidity: 66, targetTemp: 5.0 },
    { time: '12:00', temp: 5.0, humidity: 65, targetTemp: 5.0 },
    { time: '14:00', temp: 5.2, humidity: 63, targetTemp: 5.0 },
    { time: '16:00', temp: 4.9, humidity: 61, targetTemp: 5.0 },
    { time: '18:00', temp: 5.1, humidity: 64, targetTemp: 5.0 },
    { time: '20:00', temp: 5.0, humidity: 62, targetTemp: 5.0 }
  ]

  const orderFlowData: OrderFlowData[] = [
    { hour: '9AM', orders: 8, completed: 7, prep_time: 12, target_time: 15 },
    { hour: '10AM', orders: 12, completed: 11, prep_time: 14, target_time: 15 },
    { hour: '11AM', orders: 15, completed: 14, prep_time: 13, target_time: 15 },
    { hour: '12PM', orders: 25, completed: 23, prep_time: 16, target_time: 15 },
    { hour: '1PM', orders: 28, completed: 26, prep_time: 15, target_time: 15 },
    { hour: '2PM', orders: 18, completed: 17, prep_time: 12, target_time: 15 },
    { hour: '3PM', orders: 14, completed: 14, prep_time: 11, target_time: 15 },
    { hour: '4PM', orders: 10, completed: 10, prep_time: 10, target_time: 15 }
  ]

  const qualityData: QualityData[] = [
    { time: '6AM', quality: 94, safety: 98, cleanliness: 96 },
    { time: '9AM', quality: 95, safety: 97, cleanliness: 94 },
    { time: '12PM', quality: 92, safety: 96, cleanliness: 93 },
    { time: '3PM', quality: 96, safety: 98, cleanliness: 95 },
    { time: '6PM', quality: 94, safety: 97, cleanliness: 94 },
    { time: '9PM', quality: 95, safety: 98, cleanliness: 96 }
  ]

  const recentActivities: RecentActivityType[] = [
    { time: '2 min ago', activity: 'Order #1247 completed', type: 'success', agent: 'Operations' },
    { time: '5 min ago', activity: 'Temperature alert resolved', type: 'warning', agent: 'Quality' },
    { time: '8 min ago', activity: 'Inventory restocked', type: 'info', agent: 'Sourcing' },
    { time: '12 min ago', activity: 'Customer inquiry handled', type: 'success', agent: 'Customer' },
    { time: '15 min ago', activity: 'Quality check passed', type: 'success', agent: 'Quality' }
  ]

  // Agent efficiency for radial chart
  const efficiencyData: EfficiencyData[] = agentStatus.map(agent => ({
    name: agent.name,
    efficiency: agent.efficiency,
    fill: agent.status === 'active' ? '#3B82F6' : 
          agent.status === 'busy' ? '#F59E0B' : '#10B981'
  }))

  return (
    <div className="container is-fluid">
      {/* Header */}
      <div className="mb-6">
        <h1 className="title is-2 font-grandstander has-text-grey-darker mb-2">
          Kitchen Operations
        </h1>
        <p className="subtitle is-5 font-figtree has-text-grey">
          Real-time monitoring of your HeySalad kitchen operations
        </p>
      </div>

      {/* KPI Metrics */}
      <KitchenMetrics metrics={metrics} />

      {/* Main Charts Row */}
      <div className="columns is-multiline mb-6">
        {/* Environmental Monitoring */}
        <div className="column is-12-tablet is-8-desktop">
          <EnvironmentalChart data={environmentData} />
        </div>

        {/* Agent Performance */}
        <div className="column is-12-tablet is-4-desktop">
          <AgentPerformance 
            agentStatus={agentStatus} 
            efficiencyData={efficiencyData} 
          />
        </div>
      </div>

      {/* Order Flow and Quality Charts */}
      <div className="columns is-multiline mb-6">
        <div className="column is-12-tablet is-6-desktop">
          <OrderFlowChart data={orderFlowData} />
        </div>
        <div className="column is-12-tablet is-6-desktop">
          <QualityChart data={qualityData} />
        </div>
      </div>

      {/* Bottom Section: Quick Actions, Summary, and Activity */}
      <div className="columns is-multiline">
        <div className="column is-12-tablet is-4-desktop">
          <QuickActions />
        </div>
        <div className="column is-12-tablet is-4-desktop">
          <PerformanceSummary />
        </div>
        <div className="column is-12-tablet is-4-desktop">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Detailed Agent Status Cards */}
      <AgentStatusCards agentStatus={agentStatus} />
    </div>
  )
}

export default KitchenDashboard