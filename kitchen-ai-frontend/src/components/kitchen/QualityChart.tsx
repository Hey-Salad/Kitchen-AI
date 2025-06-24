// src/components/kitchen/QualityChart.tsx

import React from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import type { QualityData } from './types/kitchenTypes'

interface QualityChartProps {
  data: QualityData[]
}

const QualityChart: React.FC<QualityChartProps> = ({ data }) => {
  return (
    <div className="modern-card" style={{ height: '350px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Quality Metrics
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Food quality, safety, and cleanliness scores
        </p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            domain={[85, 100]}
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
          <Line 
            type="monotone" 
            dataKey="quality" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Food Quality (%)"
          />
          <Line 
            type="monotone" 
            dataKey="safety" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Safety Score (%)"
          />
          <Line 
            type="monotone" 
            dataKey="cleanliness" 
            stroke="#F59E0B" 
            strokeWidth={3}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            name="Cleanliness (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default QualityChart