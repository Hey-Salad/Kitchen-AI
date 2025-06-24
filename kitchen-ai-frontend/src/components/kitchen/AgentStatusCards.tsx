// src/components/kitchen/AgentStatusCards.tsx

import React from 'react'
import type { AgentStatus } from './types/kitchenTypes'
import { 
  getStatusColor, 
  getStatusTextColor, 
  getEfficiencyProgressClass,
  getAgentBorderColor 
} from '../../utils/kitchen/kitchenHelpers'

interface AgentStatusCardsProps {
  agentStatus: AgentStatus[]
}

const AgentStatusCards: React.FC<AgentStatusCardsProps> = ({ agentStatus }) => {
  return (
    <div className="columns is-multiline mt-6">
      <div className="column is-12">
        <div className="modern-card">
          <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
            AI Agent Detailed Status
          </h3>
          <div className="columns is-multiline">
            {agentStatus.map((agent, index) => (
              <div key={index} className="column is-12-mobile is-6-tablet is-3-desktop">
                <div 
                  className="p-4 has-background-white" 
                  style={{ 
                    borderRadius: '12px', 
                    border: '1px solid #dbdbdb',
                    borderLeft: `4px solid ${getAgentBorderColor(agent.status)}`
                  }}
                >
                  <div className="is-flex is-justify-content-space-between is-align-items-center mb-3">
                    <h4 className="has-text-weight-semibold has-text-grey-darker font-figtree">
                      {agent.name} Agent
                    </h4>
                    <div className="is-flex is-align-items-center">
                      <div 
                        className={`mr-2 ${getStatusColor(agent.status)}`} 
                        style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                      />
                      <span className={`tag is-small is-capitalized ${getStatusTextColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="is-flex is-justify-content-space-between mb-1">
                      <span className="is-size-7 has-text-grey-dark font-figtree">
                        Uptime
                      </span>
                      <span className="is-size-7 has-text-weight-semibold font-figtree">
                        {agent.uptime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <progress 
                      className={`progress is-small ${getEfficiencyProgressClass(agent.efficiency)}`} 
                      value={agent.efficiency} 
                      max="100"
                    >
                      {agent.efficiency}%
                    </progress>
                  </div>
                  
                  <button className="button is-small is-light is-fullwidth">
                    <span className="is-size-7 font-figtree">View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentStatusCards