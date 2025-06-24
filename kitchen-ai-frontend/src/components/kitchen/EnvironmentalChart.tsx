// src/components/kitchen/EnvironmentalChart.tsx

import React from 'react'
import { 
  ComposedChart,
  Area,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import type { EnvironmentData } from './types/kitchenTypes'

interface EnvironmentalChartProps {
  data: EnvironmentData[]
}

const EnvironmentalChart: React.FC<EnvironmentalChartProps> = ({ data }) => {
  return (
    <div className="modern-card" style={{ height: '400px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Environmental Monitoring
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Kitchen temperature and humidity levels throughout the day
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            yAxisId="temp"
            domain={[0, 10]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="humidity" 
            orientation="right"
            domain={[50, 80]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
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
            yAxisId="temp"
            type="monotone" 
            dataKey="temp" 
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#tempGradient)"
            name="Temperature (°C)"
          />
          <Line 
            yAxisId="temp"
            type="monotone" 
            dataKey="targetTemp" 
            stroke="#EF4444" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Target Temp"
          />
          <Line 
            yAxisId="humidity"
            type="monotone" 
            dataKey="humidity" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Humidity (%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EnvironmentalChart