// src/components/customer/TicketQueue.tsx

import React from 'react'
import { Clock, User, AlertTriangle } from 'lucide-react'
import type { CustomerTicket } from './types/customerTypes'
import { 
  getTicketStatusTextColor, 
  getPriorityTextColor 
} from '../../utils/customer/customerHelpers'

interface TicketQueueProps {
  tickets: CustomerTicket[]
  title?: string
}

const TicketQueue: React.FC<TicketQueueProps> = ({ 
  tickets, 
  title = "Active Tickets" 
}) => {
  return (
    <div className="modern-card">
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          {title}
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Current support tickets requiring attention
        </p>
      </div>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {tickets.map((ticket) => (
          <div 
            key={ticket.id}
            className="mb-3 p-3 has-background-white-bis"
            style={{ borderRadius: '8px', border: '1px solid #dbdbdb' }}
          >
            <div className="is-flex is-justify-content-space-between is-align-items-flex-start mb-2">
              <div className="is-flex-grow-1">
                <div className="is-flex is-align-items-center mb-1">
                  <span className="has-text-weight-semibold font-figtree mr-2">
                    #{ticket.id}
                  </span>
                  <span className={`tag is-small ${getPriorityTextColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
                <p className="is-size-6 has-text-weight-medium font-figtree mb-1">
                  {ticket.subject}
                </p>
                <p className="is-size-7 has-text-grey font-figtree mb-2">
                  <User size={12} className="mr-1" />
                  {ticket.customer} • {ticket.category}
                </p>
              </div>
              <div className="is-flex is-align-items-center">
                <span className={`tag is-small ${getTicketStatusTextColor(ticket.status)}`}>
                  {ticket.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <div className="is-flex is-align-items-center">
                <Clock size={12} className="has-text-grey mr-1" />
                <span className="is-size-7 has-text-grey font-figtree">
                  Created: {ticket.created}
                </span>
              </div>
              {ticket.agent && (
                <span className="is-size-7 has-text-weight-medium font-figtree">
                  Assigned to: {ticket.agent}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {tickets.length === 0 && (
          <div className="has-text-centered py-6">
            <AlertTriangle className="has-text-grey mb-3" size={48} />
            <p className="is-size-6 has-text-grey font-figtree">
              No tickets in queue
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketQueue