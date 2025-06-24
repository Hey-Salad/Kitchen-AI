import React from 'react'
import { DollarSign, TrendingUp, PieChart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {  
  Line, 
  AreaChart, 
  Area, 
  ComposedChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'

const BusinessDashboard: React.FC = () => {
  const metrics = [
    { 
      title: 'Revenue Today', 
      value: '£2,847', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'has-text-success', 
      bgColor: 'has-background-success-light' 
    },
    { 
      title: 'Orders Growth', 
      value: '23%', 
      change: 'vs last week', 
      trend: 'up',
      icon: TrendingUp, 
      color: 'has-text-info', 
      bgColor: 'has-background-info-light' 
    },
    { 
      title: 'Profit Margin', 
      value: '34.2%', 
      change: '+2.1%', 
      trend: 'up',
      icon: PieChart, 
      color: 'has-text-primary', 
      bgColor: 'has-background-primary-light' 
    },
    { 
      title: 'Active Customers', 
      value: '1,247', 
      change: '+5.8%', 
      trend: 'up',
      icon: Users, 
      color: 'has-text-warning', 
      bgColor: 'has-background-warning-light' 
    }
  ]

  // Sample data for charts
  const revenueData = [
    { name: 'Mon', revenue: 2400, orders: 24 },
    { name: 'Tue', revenue: 1398, orders: 18 },
    { name: 'Wed', revenue: 9800, orders: 32 },
    { name: 'Thu', revenue: 3908, orders: 28 },
    { name: 'Fri', revenue: 4800, orders: 35 },
    { name: 'Sat', revenue: 3800, orders: 42 },
    { name: 'Sun', revenue: 4300, orders: 38 }
  ]

  const customerData = [
    { name: 'New', value: 400, color: '#3B82F6' },
    { name: 'Returning', value: 300, color: '#10B981' },
    { name: 'Premium', value: 300, color: '#F59E0B' },
    { name: 'Inactive', value: 200, color: '#EF4444' }
  ]

  const orderTrendsData = [
    { month: 'Jan', orders: 65, revenue: 28000 },
    { month: 'Feb', orders: 78, revenue: 32000 },
    { month: 'Mar', orders: 90, revenue: 38000 },
    { month: 'Apr', orders: 81, revenue: 35000 },
    { month: 'May', orders: 95, revenue: 42000 },
    { month: 'Jun', orders: 110, revenue: 48000 }
  ]

  return (
    <div className="container is-fluid">
      {/* Header */}
      <div className="mb-6">
        <h1 className="title is-2 font-grandstander has-text-grey-darker mb-2">
          Business Analytics
        </h1>
        <p className="subtitle is-5 font-figtree has-text-grey">
          Track performance, revenue, and growth metrics
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="columns is-multiline mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight
          const trendColor = metric.trend === 'up' ? 'has-text-success' : 'has-text-danger'
          
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
                  <TrendIcon className={`mr-1 ${trendColor}`} size={16} />
                  <span className={`is-size-7 has-text-weight-medium font-figtree ${trendColor}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="columns is-multiline mb-6">
        {/* Revenue Trend */}
        <div className="column is-12-tablet is-8-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Revenue Trend
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Daily revenue and order volume</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
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
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Distribution */}
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Customer Types
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Distribution by customer segment</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-3">
              {customerData.map((item, index) => (
                <div key={index} className="is-flex is-align-items-center is-justify-content-space-between mb-2">
                  <div className="is-flex is-align-items-center">
                    <div 
                      className="mr-2" 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: item.color,
                        borderRadius: '50%'
                      }}
                    ></div>
                    <span className="is-size-7 font-figtree">{item.name}</span>
                  </div>
                  <span className="is-size-7 has-text-weight-semibold font-figtree">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="columns">
        <div className="column">
          <div className="modern-card">
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Monthly Performance
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Orders and revenue trends over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={orderTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar yAxisId="left" dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights - Modern Cards */}
      <div className="columns is-multiline mt-6">
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-success-light" style={{ borderLeft: '4px solid #10B981' }}>
            <div className="is-flex is-align-items-center mb-3">
              <TrendingUp className="has-text-success mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-success-dark mb-0">Revenue Growth</h4>
            </div>
            <p className="is-size-7 has-text-success-dark font-figtree mb-2">
              Revenue increased by 12.5% compared to last month
            </p>
            <span className="tag is-success is-small">Best Performance</span>
          </div>
        </div>
        
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-info-light" style={{ borderLeft: '4px solid #3B82F6' }}>
            <div className="is-flex is-align-items-center mb-3">
              <Users className="has-text-info mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-info-dark mb-0">Customer Acquisition</h4>
            </div>
            <p className="is-size-7 has-text-info-dark font-figtree mb-2">
              25% increase in new customer registrations
            </p>
            <span className="tag is-info is-small">Growing</span>
          </div>
        </div>
        
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-warning-light" style={{ borderLeft: '4px solid #F59E0B' }}>
            <div className="is-flex is-align-items-center mb-3">
              <PieChart className="has-text-warning mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-warning-dark mb-0">Operational Efficiency</h4>
            </div>
            <p className="is-size-7 has-text-warning-dark font-figtree mb-2">
              AI agents optimizing kitchen operations
            </p>
            <span className="tag is-warning is-small">Optimized</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboard