// src/components/customer/AgentPerformanceTable.tsx

import React from 'react'
import { User, Clock, Star } from 'lucide-react'
import type { AgentPerformanceData } from './types/customerTypes'
import { 
  getAgentStatusColor, 
  getAgentStatusTextColor, 
  formatResponseTime,
  getRatingColor 
} from '../../utils/customer/customerHelpers'

interface AgentPerformanceTableProps {
  agents: AgentPerformanceData[]
}

const AgentPerformanceTable: React.FC<AgentPerformanceTableProps> = ({ agents }) => {
  return (
    <div className="modern-card">
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Agent Performance
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Current team performance metrics
        </p>
      </div>
      
      <div className="table-container">
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Status</th>
              <th>Tickets Resolved</th>
              <th>Avg Response</th>
              <th>Satisfaction</th>
              <th>Current Load</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr key={index}>
                <td>
                  <div className="is-flex is-align-items-center">
                    <User size={16} className="mr-2 has-text-grey" />
                    <span className="has-text-weight-medium font-figtree">
                      {agent.agent}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="is-flex is-align-items-center">
                    <div 
                      className={`mr-2 ${getAgentStatusColor(agent.status)}`} 
                      style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                    />
                    <span className={`tag is-small ${getAgentStatusTextColor(agent.status)}`}>
                      {agent.status.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="has-text-weight-semibold">
                    {agent.ticketsResolved}
                  </span>
                </td>
                <td>
                  <div className="is-flex is-align-items-center">
                    <Clock size={14} className="mr-1 has-text-grey" />
                    <span>{formatResponseTime(agent.avgResponseTime)}</span>
                  </div>
                </td>
                <td>
                  <div className="is-flex is-align-items-center">
                    <Star size={14} className={`mr-1 ${getRatingColor(agent.satisfaction)}`} />
                    <span className={`has-text-weight-medium ${getRatingColor(agent.satisfaction)}`}>
                      {agent.satisfaction.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="is-flex is-align-items-center">
                    <span className="mr-2">{agent.currentTickets}</span>
                    <progress 
                      className={`progress is-small ${
                        agent.currentTickets > 8 ? 'is-danger' : 
                        agent.currentTickets > 5 ? 'is-warning' : 'is-success'
                      }`} 
                      value={agent.currentTickets} 
                      max="10"
                      style={{ width: '60px' }}
                    >
                      {agent.currentTickets}/10
                    </progress>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgentPerformanceTable