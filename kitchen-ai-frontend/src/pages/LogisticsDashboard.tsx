import React from 'react'
import { Truck, Package, MapPin, Clock, Navigation, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Route } from 'lucide-react'
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
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from 'recharts'

const LogisticsDashboard: React.FC = () => {
  const metrics = [
    { 
      title: 'Active Deliveries', 
      value: '18', 
      change: '+3 new', 
      trend: 'up',
      icon: Truck, 
      color: 'has-text-info', 
      bgColor: 'has-background-info-light' 
    },
    { 
      title: 'Packages Ready', 
      value: '27', 
      change: '12 pending', 
      trend: 'up',
      icon: Package, 
      color: 'has-text-success', 
      bgColor: 'has-background-success-light' 
    },
    { 
      title: 'Delivery Zones', 
      value: '8', 
      change: 'All covered', 
      trend: 'stable',
      icon: MapPin, 
      color: 'has-text-primary', 
      bgColor: 'has-background-primary-light' 
    },
    { 
      title: 'Avg Delivery Time', 
      value: '23m', 
      change: '-5 min', 
      trend: 'down',
      icon: Clock, 
      color: 'has-text-warning', 
      bgColor: 'has-background-warning-light' 
    }
  ]

  const deliveries = [
    { 
      id: 'DEL-001', 
      customer: 'Downtown Office', 
      status: 'en-route', 
      eta: '12 min', 
      driver: 'Mike Johnson',
      distance: '2.3 km',
      priority: 'high'
    },
    { 
      id: 'DEL-002', 
      customer: 'Residential Area', 
      status: 'preparing', 
      eta: '25 min', 
      driver: 'Sarah Wilson',
      distance: '4.1 km',
      priority: 'medium'
    },
    { 
      id: 'DEL-003', 
      customer: 'University Campus', 
      status: 'delivered', 
      eta: 'Completed', 
      driver: 'John Davis',
      distance: '3.8 km',
      priority: 'low'
    },
    { 
      id: 'DEL-004', 
      customer: 'Shopping Center', 
      status: 'ready', 
      eta: '15 min', 
      driver: 'Lisa Brown',
      distance: '1.9 km',
      priority: 'high'
    },
    { 
      id: 'DEL-005', 
      customer: 'Business District', 
      status: 'en-route', 
      eta: '8 min', 
      driver: 'Tom Anderson',
      distance: '1.2 km',
      priority: 'medium'
    }
  ]

  // Delivery performance over time
  const deliveryTrends = [
    { hour: '9AM', deliveries: 12, onTime: 11, delayed: 1, avgTime: 22 },
    { hour: '10AM', deliveries: 15, onTime: 14, delayed: 1, avgTime: 24 },
    { hour: '11AM', deliveries: 18, onTime: 16, delayed: 2, avgTime: 26 },
    { hour: '12PM', deliveries: 25, onTime: 22, delayed: 3, avgTime: 28 },
    { hour: '1PM', deliveries: 28, onTime: 25, delayed: 3, avgTime: 25 },
    { hour: '2PM', deliveries: 22, onTime: 20, delayed: 2, avgTime: 23 },
    { hour: '3PM', deliveries: 18, onTime: 17, delayed: 1, avgTime: 21 },
    { hour: '4PM', deliveries: 14, onTime: 13, delayed: 1, avgTime: 20 }
  ]

  // Route efficiency data
  const routeData = [
    { zone: 'Downtown', efficiency: 92, deliveries: 45, avgTime: 18 },
    { zone: 'Residential', efficiency: 88, deliveries: 38, avgTime: 25 },
    { zone: 'Business', efficiency: 95, deliveries: 52, avgTime: 16 },
    { zone: 'University', efficiency: 85, deliveries: 28, avgTime: 22 },
    { zone: 'Shopping', efficiency: 90, deliveries: 35, avgTime: 20 },
    { zone: 'Industrial', efficiency: 82, deliveries: 22, avgTime: 28 }
  ]

  // Driver performance
  const driverStats = [
    { name: 'Mike J.', deliveries: 23, onTime: 95, rating: 4.9, hours: 8 },
    { name: 'Sarah W.', deliveries: 19, onTime: 92, rating: 4.8, hours: 7.5 },
    { name: 'John D.', deliveries: 21, onTime: 88, rating: 4.7, hours: 8 },
    { name: 'Lisa B.', deliveries: 18, onTime: 94, rating: 4.9, hours: 7 },
    { name: 'Tom A.', deliveries: 16, onTime: 90, rating: 4.6, hours: 6.5 }
  ]

  // Delivery status distribution
  const statusDistribution = [
    { name: 'Delivered', value: 142, color: '#10B981' },
    { name: 'En Route', value: 18, color: '#3B82F6' },
    { name: 'Preparing', value: 12, color: '#F59E0B' },
    { name: 'Ready', value: 8, color: '#8B5CF6' }
  ]

  // Vehicle tracking data (simulated GPS coordinates)
  const vehicleTracking = [
    { vehicle: 'V001', lat: 51.5074, lng: -0.1278, status: 'en-route', driver: 'Mike J.' },
    { vehicle: 'V002', lat: 51.5155, lng: -0.1426, status: 'preparing', driver: 'Sarah W.' },
    { vehicle: 'V003', lat: 51.5033, lng: -0.1195, status: 'delivered', driver: 'John D.' },
    { vehicle: 'V004', lat: 51.5099, lng: -0.1337, status: 'ready', driver: 'Lisa B.' },
    { vehicle: 'V005', lat: 51.5122, lng: -0.1256, status: 'en-route', driver: 'Tom A.' }
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered': return 'has-background-success has-text-white'
      case 'en-route': return 'has-background-info has-text-white'
      case 'ready': return 'has-background-primary has-text-white'
      case 'preparing': return 'has-background-warning has-text-dark'
      default: return 'has-background-grey-light has-text-dark'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'has-text-danger'
      case 'medium': return 'has-text-warning'
      case 'low': return 'has-text-success'
      default: return 'has-text-grey'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={14} className="has-text-danger" />
      case 'medium': return <Clock size={14} className="has-text-warning" />
      case 'low': return <CheckCircle2 size={14} className="has-text-success" />
      default: return <Clock size={14} className="has-text-grey" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="has-text-success" />
      case 'down': return <TrendingDown size={14} className="has-text-success" />
      default: return <CheckCircle2 size={14} className="has-text-info" />
    }
  }

  return (
    <div className="container is-fluid">
      {/* Header */}
      <div className="mb-6">
        <h1 className="title is-2 font-grandstander has-text-grey-darker mb-2">
          Logistics & Delivery
        </h1>
        <p className="subtitle is-5 font-figtree has-text-grey">
          Manage deliveries, routes, and supply chain operations
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="columns is-multiline mb-6">
        {metrics.map((metric, index) => {
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

      {/* Main Charts Row */}
      <div className="columns is-multiline mb-6">
        {/* Delivery Performance Trends */}
        <div className="column is-12-tablet is-8-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Delivery Performance Trends
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Hourly delivery volume and on-time performance</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={deliveryTrends}>
                <defs>
                  <linearGradient id="deliveryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Deliveries', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Avg Time (min)', angle: 90, position: 'insideRight' }}
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
                  dataKey="deliveries" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#deliveryGradient)"
                  name="Total Deliveries"
                />
                <Bar yAxisId="left" dataKey="onTime" fill="#10B981" radius={[2, 2, 0, 0]} name="On Time" />
                <Bar yAxisId="left" dataKey="delayed" fill="#EF4444" radius={[2, 2, 0, 0]} name="Delayed" />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="Avg Time (min)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Status Distribution */}
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card" style={{ height: '400px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Delivery Status
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Current delivery status distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3">
              {statusDistribution.map((item, index) => (
                <div key={index} className="is-flex is-align-items-center is-justify-content-space-between mb-2 p-2 has-background-white-bis" style={{ borderRadius: '6px' }}>
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

      {/* Route Efficiency and Driver Performance */}
      <div className="columns is-multiline mb-6">
        {/* Route Efficiency */}
        <div className="column is-12-tablet is-6-desktop">
          <div className="modern-card" style={{ height: '350px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Route Efficiency by Zone
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Delivery efficiency and average time by area</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={routeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  type="category"
                  dataKey="zone"
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
                <Bar 
                  dataKey="efficiency" 
                  fill="#10B981" 
                  radius={[0, 4, 4, 0]} 
                  name="Efficiency (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Performance */}
        <div className="column is-12-tablet is-6-desktop">
          <div className="modern-card" style={{ height: '350px' }}>
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Driver Performance
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Top performing drivers today</p>
            </div>
            <div className="content" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {driverStats.map((driver, index) => (
                <div key={index} className="is-flex is-align-items-center is-justify-content-space-between mb-3 p-3 has-background-white-bis" style={{ borderRadius: '8px' }}>
                  <div className="is-flex is-align-items-center">
                    <div className="mr-3">
                      <div className="has-background-primary" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="has-text-white is-size-7 font-figtree has-text-weight-bold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="is-size-7 font-figtree has-text-weight-semibold mb-1">{driver.name}</p>
                      <p className="is-size-7 has-text-grey font-figtree">{driver.deliveries} deliveries • {driver.hours}h</p>
                    </div>
                  </div>
                  <div className="has-text-right">
                    <p className="is-size-7 font-figtree has-text-weight-semibold has-text-success">{driver.onTime}% on-time</p>
                    <p className="is-size-7 has-text-grey font-figtree">★ {driver.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Deliveries Table */}
      <div className="columns mb-6">
        <div className="column">
          <div className="modern-card">
            <div className="mb-4">
              <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
                Active Deliveries
              </h3>
              <p className="is-size-7 has-text-grey font-figtree">Real-time tracking of current deliveries</p>
            </div>
            <div className="table-container">
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th className="font-figtree has-text-weight-semibold">Delivery ID</th>
                    <th className="font-figtree has-text-weight-semibold">Customer</th>
                    <th className="font-figtree has-text-weight-semibold">Status</th>
                    <th className="font-figtree has-text-weight-semibold">ETA</th>
                    <th className="font-figtree has-text-weight-semibold">Driver</th>
                    <th className="font-figtree has-text-weight-semibold">Distance</th>
                    <th className="font-figtree has-text-weight-semibold">Priority</th>
                    <th className="font-figtree has-text-weight-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery, index) => (
                    <tr key={index}>
                      <td className="font-figtree has-text-weight-medium">{delivery.id}</td>
                      <td className="font-figtree">{delivery.customer}</td>
                      <td>
                        <span className={`tag is-small ${getStatusStyle(delivery.status)}`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="font-figtree">{delivery.eta}</td>
                      <td className="font-figtree">{delivery.driver}</td>
                      <td className="font-figtree">{delivery.distance}</td>
                      <td>
                        <div className="is-flex is-align-items-center">
                          {getPriorityIcon(delivery.priority)}
                          <span className={`is-size-7 font-figtree ml-1 ${getPriorityColor(delivery.priority)}`}>
                            {delivery.priority}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="buttons are-small">
                          <button className="button is-info is-small">
                            <Navigation size={12} />
                          </button>
                          <button className="button is-light is-small">
                            <Route size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Fleet Status and Quick Actions */}
      <div className="columns is-multiline">
        {/* Fleet Status */}
        <div className="column is-12-tablet is-6-desktop">
          <div className="modern-card">
            <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
              Fleet Status
            </h3>
            <div className="columns is-multiline is-mobile">
              <div className="column is-6">
                <div className="has-text-centered p-3 has-background-success-light" style={{ borderRadius: '8px' }}>
                  <p className="title is-6 font-grandstander has-text-success-dark mb-1">5</p>
                  <p className="is-size-7 has-text-success-dark font-figtree">Vehicles Active</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="has-text-centered p-3 has-background-info-light" style={{ borderRadius: '8px' }}>
                  <p className="title is-6 font-grandstander has-text-info-dark mb-1">2</p>
                  <p className="is-size-7 has-text-info-dark font-figtree">Vehicles Idle</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="has-text-centered p-3 has-background-warning-light" style={{ borderRadius: '8px' }}>
                  <p className="title is-6 font-grandstander has-text-warning-dark mb-1">23.4</p>
                  <p className="is-size-7 has-text-warning-dark font-figtree">Avg Speed (km/h)</p>
                </div>
              </div>
              <div className="column is-6">
                <div className="has-text-centered p-3 has-background-primary-light" style={{ borderRadius: '8px' }}>
                  <p className="title is-6 font-grandstander has-text-primary-dark mb-1">94%</p>
                  <p className="is-size-7 has-text-primary-dark font-figtree">Fleet Efficiency</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #dbdbdb' }}>
              <h4 className="title is-6 font-grandstander has-text-grey-darker mb-3">Vehicle Tracking</h4>
              <div className="content" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {vehicleTracking.map((vehicle, index) => (
                  <div key={index} className="is-flex is-align-items-center is-justify-content-space-between mb-2 p-2 has-background-white-bis" style={{ borderRadius: '6px' }}>
                    <div className="is-flex is-align-items-center">
                      <Truck className="mr-2 has-text-info" size={16} />
                      <div>
                        <span className="is-size-7 font-figtree has-text-weight-medium">{vehicle.vehicle}</span>
                        <span className="is-size-7 has-text-grey font-figtree ml-2">• {vehicle.driver}</span>
                      </div>
                    </div>
                    <span className={`tag is-small ${getStatusStyle(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Analytics */}
        <div className="column is-12-tablet is-6-desktop">
          <div className="modern-card">
            <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
              Quick Actions & Analytics
            </h3>
            
            <div className="columns is-multiline is-mobile mb-4">
              <div className="column is-6">
                <button className="button is-heysalad-primary is-fullwidth p-4" style={{ height: '80px' }}>
                  <div className="has-text-centered">
                    <Truck className="mb-2" size={24} />
                    <span className="is-size-7 font-figtree has-text-weight-medium">Dispatch Vehicle</span>
                  </div>
                </button>
              </div>
              <div className="column is-6">
                <button className="button is-heysalad-secondary is-fullwidth p-4" style={{ height: '80px' }}>
                  <div className="has-text-centered">
                    <Route className="mb-2" size={24} />
                    <span className="is-size-7 font-figtree has-text-weight-medium">Optimize Routes</span>
                  </div>
                </button>
              </div>
              <div className="column is-6">
                <button className="button is-light is-fullwidth p-4" style={{ height: '80px', border: '1px solid #dbdbdb' }}>
                  <div className="has-text-centered">
                    <MapPin className="mb-2" size={24} />
                    <span className="is-size-7 font-figtree has-text-weight-medium">View Map</span>
                  </div>
                </button>
              </div>
              <div className="column is-6">
                <button className="button is-light is-fullwidth p-4" style={{ height: '80px', border: '1px solid #dbdbdb' }}>
                  <div className="has-text-centered">
                    <Package className="mb-2" size={24} />
                    <span className="is-size-7 font-figtree has-text-weight-medium">Package Status</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #dbdbdb' }}>
              <h4 className="title is-6 font-grandstander has-text-grey-darker mb-3">Today's Summary</h4>
              <div className="content">
                <div className="is-flex is-align-items-center is-justify-content-space-between mb-2">
                  <span className="is-size-7 has-text-grey-dark font-figtree">Total Deliveries</span>
                  <span className="is-size-7 has-text-weight-semibold has-text-grey-darker font-figtree">142</span>
                </div>
                <div className="is-flex is-align-items-center is-justify-content-space-between mb-2">
                  <span className="is-size-7 has-text-grey-dark font-figtree">On-Time Rate</span>
                  <span className="is-size-7 has-text-weight-semibold has-text-success font-figtree">94%</span>
                </div>
                <div className="is-flex is-align-items-center is-justify-content-space-between mb-2">
                  <span className="is-size-7 has-text-grey-dark font-figtree">Total Distance</span>
                  <span className="is-size-7 has-text-weight-semibold has-text-grey-darker font-figtree">1,247 km</span>
                </div>
                <div className="is-flex is-align-items-center is-justify-content-space-between mb-2">
                  <span className="is-size-7 has-text-grey-dark font-figtree">Fuel Efficiency</span>
                  <span className="is-size-7 has-text-weight-semibold has-text-primary font-figtree">8.2 L/100km</span>
                </div>
                
                <div className="mt-3">
                  <div className="is-flex is-align-items-center is-justify-content-space-between">
                    <span className="is-size-7 has-text-grey-dark font-figtree">Overall Performance</span>
                    <div className="is-flex is-align-items-center">
                      <progress className="progress is-success is-small mr-2" value="94" max="100" style={{ width: '60px' }}>94%</progress>
                      <span className="is-size-7 has-text-weight-semibold has-text-success font-figtree">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Optimization Insights */}
      <div className="columns mt-6">
        <div className="column">
          <div className="modern-card">
            <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
              Route Optimization Insights
            </h3>
            <div className="columns is-multiline">
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-success-light" 
                     style={{ borderRadius: '12px', border: '1px solid #10B981', borderLeft: '4px solid #10B981' }}>
                  <TrendingUp className="has-text-success mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-success-dark mb-2">Route Efficiency</h4>
                  <p className="is-size-7 has-text-success-dark font-figtree mb-2">
                    AI optimization reduced average delivery time by 18%
                  </p>
                  <span className="tag is-success is-small">+18% Improvement</span>
                </div>
              </div>
              
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-info-light" 
                     style={{ borderRadius: '12px', border: '1px solid #3B82F6', borderLeft: '4px solid #3B82F6' }}>
                  <Package className="has-text-info mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-info-dark mb-2">Package Consolidation</h4>
                  <p className="is-size-7 has-text-info-dark font-figtree mb-2">
                    Smart grouping increased vehicle capacity utilization
                  </p>
                  <span className="tag is-info is-small">87% Utilization</span>
                </div>
              </div>
              
              <div className="column is-12-tablet is-4-desktop">
                <div className="has-text-centered p-4 has-background-warning-light" 
                     style={{ borderRadius: '12px', border: '1px solid #F59E0B', borderLeft: '4px solid #F59E0B' }}>
                  <Clock className="has-text-warning mb-3" size={32} />
                  <h4 className="title is-6 font-grandstander has-text-warning-dark mb-2">Real-Time Adjustments</h4>
                  <p className="is-size-7 has-text-warning-dark font-figtree mb-2">
                    Dynamic rerouting based on traffic and priority changes
                  </p>
                  <span className="tag is-warning is-small">Live Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      <div className="columns mt-6">
        <div className="column">
          <div className="modern-card">
            <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
              Performance Alerts & Recommendations
            </h3>
            <div className="content">
              <div className="notification is-warning is-light">
                <div className="is-flex is-align-items-center">
                  <AlertCircle className="mr-3 has-text-warning" size={20} />
                  <div>
                    <p className="font-figtree has-text-weight-semibold">Route Downtown-B experiencing delays</p>
                    <p className="is-size-7 font-figtree has-text-grey-dark">Consider alternative route via Business District. Estimated time savings: 8 minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="notification is-info is-light">
                <div className="is-flex is-align-items-center">
                  <CheckCircle2 className="mr-3 has-text-info" size={20} />
                  <div>
                    <p className="font-figtree has-text-weight-semibold">Vehicle V003 available for priority delivery</p>
                    <p className="is-size-7 font-figtree has-text-grey-dark">Driver John D. just completed delivery and is 2.1km from high-priority pickup location</p>
                  </div>
                </div>
              </div>
              
              <div className="notification is-success is-light">
                <div className="is-flex is-align-items-center">
                  <TrendingUp className="mr-3 has-text-success" size={20} />
                  <div>
                    <p className="font-figtree has-text-weight-semibold">Delivery performance above target</p>
                    <p className="is-size-7 font-figtree has-text-grey-dark">Current on-time rate of 94% exceeds monthly target of 90%. Great work team!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogisticsDashboard