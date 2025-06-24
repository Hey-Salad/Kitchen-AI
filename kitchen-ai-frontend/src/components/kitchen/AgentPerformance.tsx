// src/components/kitchen/AgentPerformance.tsx

import React from 'react'
import { 
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import type { AgentStatus, EfficiencyData } from './types/kitchenTypes'
import { getStatusColor } from '../../utils/kitchen/kitchenHelpers'

interface AgentPerformanceProps {
  agentStatus: AgentStatus[]
  efficiencyData: EfficiencyData[]
}

const AgentPerformance: React.FC<AgentPerformanceProps> = ({ 
  agentStatus, 
  efficiencyData 
}) => {
  return (
    <div className="modern-card" style={{ height: '400px' }}>
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Agent Performance
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          AI agent efficiency and status
        </p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="30%" 
          outerRadius="80%" 
          data={efficiencyData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar 
            dataKey="efficiency" 
            cornerRadius={4}
            label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-3">
        {agentStatus.map((agent, index) => (
          <div 
            key={index} 
            className="is-flex is-align-items-center is-justify-content-space-between mb-2 p-2 has-background-white-bis" 
            style={{ borderRadius: '6px' }}
          >
            <div className="is-flex is-align-items-center">
              <div 
                className={`mr-3 ${getStatusColor(agent.status)}`} 
                style={{ width: '8px', height: '8px', borderRadius: '50%' }}
              />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                {agent.name}
              </span>
            </div>
            <span className="is-size-7 has-text-weight-semibold font-figtree">
              {agent.efficiency}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgentPerformance