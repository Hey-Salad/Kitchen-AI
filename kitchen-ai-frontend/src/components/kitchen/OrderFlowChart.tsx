// src/components/kitchen/OrderFlowChart.tsx

import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import type { OrderFlowData } from './types/kitchenTypes'

interface OrderFlowChartProps {
  data: OrderFlowData[]
}

const OrderFlowChart: React.FC<OrderFlowChartProps> = ({ data }) => {
  return (
    <div className="modern-card" style={{ height: '350px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Order Flow Analysis
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Hourly order volume and completion rates
        </p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="hour" 
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
            dataKey="orders" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]} 
            name="Orders Received" 
          />
          <Bar 
            dataKey="completed" 
            fill="#10B981" 
            radius={[4, 4, 0, 0]} 
            name="Orders Completed" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrderFlowChart