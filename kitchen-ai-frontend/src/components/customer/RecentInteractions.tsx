// src/components/customer/RecentInteractions.tsx

import React from 'react'
import { Phone, Mail, MessageCircle, Share2, Clock } from 'lucide-react'
import type { CustomerInteraction } from './types/customerTypes'

interface RecentInteractionsProps {
  interactions: CustomerInteraction[]
}

const RecentInteractions: React.FC<RecentInteractionsProps> = ({ interactions }) => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} className="has-text-success" />
      case 'email': return <Mail size={16} className="has-text-info" />
      case 'chat': return <MessageCircle size={16} className="has-text-warning" />
      case 'social': return <Share2 size={16} className="has-text-primary" />
      default: return <MessageCircle size={16} className="has-text-grey" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'has-text-success'
      case 'completed': return 'has-text-info'
      case 'waiting': return 'has-text-warning'
      default: return 'has-text-grey'
    }
  }

  return (
    <div className="modern-card">
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Recent Interactions
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Latest customer communications
        </p>
      </div>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {interactions.map((interaction) => (
          <div 
            key={interaction.id}
            className="mb-3 p-3 has-background-white-bis"
            style={{ borderRadius: '8px', border: '1px solid #dbdbdb' }}
          >
            <div className="is-flex is-justify-content-space-between is-align-items-flex-start mb-2">
              <div className="is-flex is-align-items-center">
                {getInteractionIcon(interaction.type)}
                <div className="ml-3">
                  <p className="is-size-6 has-text-weight-medium font-figtree mb-1">
                    {interaction.subject}
                  </p>
                  <p className="is-size-7 has-text-grey font-figtree">
                    {interaction.customer} • {interaction.type.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="is-flex is-align-items-center">
                <span className={`tag is-small ${getStatusColor(interaction.status)}`}>
                  {interaction.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <div className="is-flex is-align-items-center">
                <Clock size={12} className="has-text-grey mr-1" />
                <span className="is-size-7 has-text-grey font-figtree">
                  {interaction.time}
                  {interaction.duration && ` • ${interaction.duration}`}
                </span>
              </div>
              <span className="is-size-7 has-text-weight-medium font-figtree">
                {interaction.agent}
              </span>
            </div>
          </div>
        ))}
        
        {interactions.length === 0 && (
          <div className="has-text-centered py-6">
            <MessageCircle className="has-text-grey mb-3" size={48} />
            <p className="is-size-6 has-text-grey font-figtree">
              No recent interactions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentInteractions