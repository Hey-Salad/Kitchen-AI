// src/components/customer/SupportChannels.tsx

import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import type { SupportChannelData } from './types/customerTypes'

interface SupportChannelsProps {
  data: SupportChannelData[]
  chartType?: 'bar' | 'pie'
}

const SupportChannels: React.FC<SupportChannelsProps> = ({ 
  data, 
  chartType = 'bar' 
}) => {
  return (
    <div className="modern-card" style={{ height: '400px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Support Channels
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Ticket volume by communication channel
        </p>
      </div>
      
      {chartType === 'bar' ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="channel" 
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
            <Bar 
              dataKey="tickets" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]} 
              name="Tickets" 
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="tickets"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
      
      <div className="mt-3">
        <div className="columns is-multiline is-mobile">
          {data.map((channel, index) => (
            <div key={index} className="column is-6">
              <div className="is-flex is-align-items-center mb-2">
                <div 
                  className="mr-2" 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: channel.color,
                    borderRadius: '50%'
                  }}
                />
                <div className="is-flex-grow-1">
                  <p className="is-size-7 font-figtree has-text-weight-medium">
                    {channel.channel}
                  </p>
                  <p className="is-size-7 has-text-grey font-figtree">
                    {channel.tickets} tickets • {channel.avgResponseTime}min avg
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportChannels