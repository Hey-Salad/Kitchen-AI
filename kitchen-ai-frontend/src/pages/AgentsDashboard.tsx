import React, { useState, useEffect } from 'react'
import { Bot, Activity, CheckCircle, AlertTriangle, Clock, RefreshCw, TrendingUp, TrendingDown, Zap, Target, BarChart3 } from 'lucide-react'
import { 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts'
import { kitchenAPI } from '../services/api'
import { useRealTime } from '../contexts/RealTimeContext'

interface Agent {
  agent_id: string
  status: string
  tasks_completed: number
  uptime: string
}

const AgentsDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const { isConnected, agentUpdates } = useRealTime()

  // Mock performance data for charts
  const performanceData = [
    { time: '6AM', efficiency: 85, tasks: 12, uptime: 98 },
    { time: '9AM', efficiency: 92, tasks: 18, uptime: 99 },
    { time: '12PM', efficiency: 88, tasks: 25, uptime: 97 },
    { time: '3PM', efficiency: 95, tasks: 22, uptime: 100 },
    { time: '6PM', efficiency: 90, tasks: 19, uptime: 98 },
    { time: '9PM', efficiency: 87, tasks: 14, uptime: 99 }
  ]

  const taskDistribution = [
    { agent: 'Sourcing', completed: 23, pending: 3, efficiency: 92 },
    { agent: 'Quality', completed: 18, pending: 2, efficiency: 88 },
    { agent: 'Operations', completed: 31, pending: 4, efficiency: 95 },
    { agent: 'Customer', completed: 15, pending: 1, efficiency: 90 }
  ]

  const systemMetrics = [
    { 
      title: 'Active Agents', 
      value: '4/4', 
      change: 'All Online', 
      trend: 'up',
      icon: Bot, 
      color: 'has-text-info', 
      bgColor: 'has-background-info-light' 
    },
    { 
      title: 'Tasks Completed', 
      value: '87', 
      change: '+12 today', 
      trend: 'up',
      icon: CheckCircle, 
      color: 'has-text-success', 
      bgColor: 'has-background-success-light' 
    },
    { 
      title: 'Avg Efficiency', 
      value: '91%', 
      change: '+3.2%', 
      trend: 'up',
      icon: Target, 
      color: 'has-text-primary', 
      bgColor: 'has-background-primary-light' 
    },
    { 
      title: 'System Uptime', 
      value: '99.2%', 
      change: 'Excellent', 
      trend: 'stable',
      icon: Activity, 
      color: 'has-text-warning', 
      bgColor: 'has-background-warning-light' 
    }
  ]

  useEffect(() => {
    fetchAgentStatus()
    
    // Auto-refresh every 10 seconds if connected
    const interval = setInterval(() => {
      if (isConnected) {
        fetchAgentStatus()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [isConnected])

  const fetchAgentStatus = async () => {
    try {
      const response = await kitchenAPI.getSystemStatus()
      
      if (response.agents) {
        const agentList = Object.entries(response.agents).map(([id, info]: [string, any]) => ({
          agent_id: id,
          status: info.status || 'unknown',
          tasks_completed: info.tasks_completed || 0,
          uptime: info.uptime || '0:00:00'
        }))
        setAgents(agentList)
        setLastRefresh(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch agent status:', error)
      
      // Show mock data if backend not available
      const mockAgents = [
        { agent_id: 'heysalad_sourcing', status: 'idle', tasks_completed: 23, uptime: '2:34:12' },
        { agent_id: 'heysalad_quality', status: 'active', tasks_completed: 18, uptime: '2:34:12' },
        { agent_id: 'heysalad_operations', status: 'busy', tasks_completed: 31, uptime: '2:34:12' },
        { agent_id: 'heysalad_customer', status: 'idle', tasks_completed: 15, uptime: '2:34:12' }
      ]
      setAgents(mockAgents)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="has-text-info" size={16} />
      case 'idle':
        return <CheckCircle className="has-text-success" size={16} />
      case 'busy':
        return <Clock className="has-text-warning" size={16} />
      default:
        return <AlertTriangle className="has-text-danger" size={16} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'has-background-info has-text-white'
      case 'idle':
        return 'has-background-success has-text-white'
      case 'busy':
        return 'has-background-warning has-text-dark'
      default:
        return 'has-background-danger has-text-white'
    }
  }

  const formatAgentName = (agentId: string) => {
    return agentId
      .replace('heysalad_', '')
      .replace('_', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + ' Agent'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="has-text-success" />
      case 'down': return <TrendingDown size={14} className="has-text-danger" />
      default: return <CheckCircle size={14} className="has-text-info" />
    }
  }

  if (loading) {
    return (
      <div className="container is-fluid">
        <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '300px' }}>
          <div className="has-text-centered">
            <div className="mb-4">
              <div className="is-inline-block" style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #e5e7eb', 
                borderTop: '3px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
            <p className="title is-5 font-grandstander has-text-grey-darker">Loading Kitchen AI Agents</p>
            <p className="subtitle is-6 font-figtree has-text-grey">Connecting to your agent network...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container is-fluid">
      {/* Header */}
      <div className="mb-6">
        <h1 className="title is-2 font-grandstander has-text-grey-darker mb-2">
          Kitchen AI Agents
        </h1>
        <p className="subtitle is-5 font-figtree has-text-grey">
          Monitor and manage your Kitchen AI agent system
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="columns is-multiline mb-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon
          
          return (
            <div key={index} className="column is-12-mobile is-6-tablet is-3-desktop">
              <div className="modern-card" style={{ height: '140px' }}>
                <div className="is-flex is-justify-content-space-between is-align-items-flex-start mb-3">
                  <div className="is-flex-grow-1">
                    <p className="is-size-7 has-text-weight-medium has-text-grey-dark mb-2 font-figtree">
                      {metric.title}
                    </p>
                    <p className="title is-3 font-grandstander has-text-grey-darker mb-2">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`p-3 ${metric.bgColor}`} style={{ borderRadius: '12px' }}>
                    <Icon className={`${metric.color}`} size={20} />
                  </div>
                </div>
                <div className="is-flex is-align-items-center">
                  {getTrendIcon(metric.trend)}
                  <span className="is-size-7 has-text-weight-medium font-figtree ml-2">
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Connection Status Bar */}
      <div className="columns mb-6">
        <div className="column">
          <div className="modern-card" style={{ background: isConnected ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
            <div className="is-flex is-align-items-center is-justify-content-space-between">
              <div className="is-flex is-align-items-center">
                <div className={`mr-3 ${isConnected ? 'has-background-success' : 'has-background-warning'}`} 
                     style={{ width: '12px', height: '12px', borderRadius: '50%' }}></div>
                <div>
                  <p className="is-size-7 font-figtree has-text-weight-semibold">
                    Connection Status: {isConnected ? 'Real-time Connected' : 'Mock Data Mode'}
                  </p>
                  <p className="is-size-7 font-figtree has-text-grey-dark">
                    Last Update: {lastRefresh.toLocaleTimeString()} • Recent Updates: {agentUpdates.length}
                  </p>
                </div>
              </div>
              <button
                onClick={fetchAgentStatus}
                disabled={loading}
                className="button is-heysalad-secondary is-small"
              >
                <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} size={14} />
                <span className="font-figtree">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="columns is-multiline mb-6">
        {/* Agent Performance Trends */}
        <div className="column is-12-tablet is-8-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Agent Performance Trends
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Efficiency and task completion throughout the day</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData}>
                <defs>
                  <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Tasks', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  domain={[70, 100]}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Efficiency (%)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#efficiencyGradient)"
                  name="Tasks Completed"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Efficiency (%)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                  name="Uptime (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Task Distribution
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Current workload by agent</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  type="category"
                  dataKey="agent"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="completed" fill="#10B981" radius={[0, 4, 4, 0]} name="Completed" />
                <Bar dataKey="pending" fill="#F59E0B" radius={[0, 4, 4, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3">
              {taskDistribution.map((item, index) => (
                <div key={index} className="is-flex is-align-items-center is-justify-content-space-between mb-2 p-2 has-background-white-bis" style={{ borderRadius: '6px' }}>
                  <span className="is-size-7 font-figtree has-text-weight-medium">{item.agent}</span>
                  <span className="is-size-7 has-text-weight-semibold font-figtree has-text-success">{item.efficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="columns mb-6">
        <div className="column">
          <div className="modern-card">
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Individual Agent Status
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Detailed monitoring of each AI agent</p>
            </div>
            <div className="columns is-multiline">
              {agents.map((agent) => (
                <div key={agent.agent_id} className="column is-12-mobile is-6-tablet is-6-desktop is-3-widescreen">
                  <div className="p-4 has-background-white" 
                       style={{ 
                         borderRadius: '12px', 
                         border: '1px solid #E5E7EB',
                         borderLeft: `4px solid ${
                           agent.status === 'active' ? '#3B82F6' : 
                           agent.status === 'busy' ? '#F59E0B' : '#10B981'
                         }`,
                         transition: 'all 0.2s ease',
                         boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                       }}>
                    <div className="is-flex is-align-items-center mb-3">
                      <div className="mr-3">
                        <div className="p-2 has-background-grey-lighter" style={{ borderRadius: '8px' }}>
                          <Bot className="has-text-primary" size={20} />
                        </div>
                      </div>
                      <div className="is-flex-grow-1">
                        <h4 className="is-size-7 font-figtree has-text-weight-semibold has-text-grey-darker mb-1">
                          {formatAgentName(agent.agent_id)}
                        </h4>
                        <p className="is-size-7 font-figtree has-text-grey">
                          {agent.agent_id}
                        </p>
                      </div>
                      {getStatusIcon(agent.status)}
                    </div>

                    <div className="mb-3">
                      <div className="is-flex is-justify-content-space-between is-align-items-center mb-2">
                        <span className="is-size-7 font-figtree has-text-grey-dark">Status:</span>
                        <span className={`tag is-small ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                      
                      <div className="is-flex is-justify-content-space-between is-align-items-center mb-2">
                        <span className="is-size-7 font-figtree has-text-grey-dark">Tasks:</span>
                        <span className="is-size-7 font-figtree has-text-weight-semibold">{agent.tasks_completed}</span>
                      </div>
                      
                      <div className="is-flex is-justify-content-space-between is-align-items-center">
                        <span className="is-size-7 font-figtree has-text-grey-dark">Uptime:</span>
                        <span className="is-size-7 font-figtree has-text-weight-semibold">{agent.uptime}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => fetchAgentStatus()}
                      className="button is-heysalad-secondary is-small is-fullwidth"
                    >
                      <span className="font-figtree">View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {agents.length === 0 && (
        <div className="columns">
          <div className="column">
            <div className="modern-card">
              <div className="has-text-centered py-6">
                <Bot className="has-text-grey-light mb-4" size={48} />
                <p className="title is-5 font-grandstander has-text-grey">No agents found</p>
                <p className="subtitle is-6 font-figtree has-text-grey-dark">
                  {isConnected 
                    ? 'Check your Kitchen AI backend configuration'
                    : 'Start your Kitchen AI backend on localhost:8000'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Performance Summary */}
      <div className="columns">
        <div className="column">
          <div className="modern-card">
            <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
              System Performance Summary
            </h3>
            <div className="columns is-multiline">
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-success-light" 
                     style={{ borderRadius: '12px', border: '1px solid #10B981', borderLeft: '4px solid #10B981' }}>
                  <CheckCircle className="has-text-success mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-success-dark mb-2">System Health</h4>
                  <p className="is-size-7 has-text-success-dark font-figtree mb-2">
                    {isConnected ? `${agents.length} agents active and responsive` : 'Demo mode with simulated data'}
                  </p>
                  <span className="tag is-success is-small">
                    {isConnected ? 'Live Connection' : 'Demo Mode'}
                  </span>
                </div>
              </div>
              
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-info-light" 
                     style={{ borderRadius: '12px', border: '1px solid #3B82F6', borderLeft: '4px solid #3B82F6' }}>
                  <BarChart3 className="has-text-info mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-info-dark mb-2">Task Performance</h4>
                  <p className="is-size-7 has-text-info-dark font-figtree mb-2">
                    {agents.reduce((sum, agent) => sum + agent.tasks_completed, 0)} total tasks completed today
                  </p>
                  <span className="tag is-info is-small">High Efficiency</span>
                </div>
              </div>
              
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-warning-light" 
                     style={{ borderRadius: '12px', border: '1px solid #F59E0B', borderLeft: '4px solid #F59E0B' }}>
                  <Zap className="has-text-warning mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-warning-dark mb-2">ADK Framework</h4>
                  <p className="is-size-7 has-text-warning-dark font-figtree mb-2">
                    Multi-agent coordination and intelligent task distribution
                  </p>
                  <span className="tag is-warning is-small">Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsDashboard