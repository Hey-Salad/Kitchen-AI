// src/components/customer/SatisfactionChart.tsx

import React from 'react'
import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import type { CustomerSatisfactionData } from './types/customerTypes'

interface SatisfactionChartProps {
  data: CustomerSatisfactionData[]
}

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({ data }) => {
  return (
    <div className="modern-card" style={{ height: '400px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Customer Satisfaction Trends
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Satisfaction scores and response times over time
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            yAxisId="satisfaction"
            domain={[0, 5]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Satisfaction (1-5)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="response"
            orientation="right"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Response Time (min)', angle: 90, position: 'insideRight' }}
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
            yAxisId="satisfaction"
            type="monotone" 
            dataKey="satisfaction" 
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#satisfactionGradient)"
            name="Satisfaction Score"
          />
          <Line 
            yAxisId="response"
            type="monotone" 
            dataKey="responseTime" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Avg Response Time (min)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SatisfactionChart