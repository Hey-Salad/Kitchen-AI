// src/components/customer/CustomerFeedback.tsx

import React from 'react'
import { Star, MessageSquare, Clock } from 'lucide-react'
import type { CustomerFeedback as CustomerFeedbackType } from './types/customerTypes'
import { getFeedbackStatusColor, getRatingColor } from '../../utils/customer/customerHelpers'

interface CustomerFeedbackProps {
  feedback: CustomerFeedbackType[]
}

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ feedback }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'has-text-warning' : 'has-text-grey-light'}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ))
  }

  return (
    <div className="modern-card">
      <div className="mb-4">
        <h3 className="title is-5 font-grandstander has-text-grey-darker mb-2">
          Customer Feedback
        </h3>
        <p className="is-size-7 has-text-grey font-figtree">
          Recent reviews and feedback from customers
        </p>
      </div>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {feedback.map((item) => (
          <div 
            key={item.id}
            className="mb-4 p-3 has-background-white"
            style={{ 
              borderRadius: '8px', 
              border: '1px solid #dbdbdb',
              borderLeft: `4px solid ${item.rating >= 4 ? '#10B981' : item.rating >= 3 ? '#F59E0B' : '#EF4444'}`
            }}
          >
            <div className="is-flex is-justify-content-space-between is-align-items-flex-start mb-3">
              <div className="is-flex-grow-1">
                <div className="is-flex is-align-items-center mb-2">
                  <div className="is-flex is-align-items-center mr-3">
                    {renderStars(item.rating)}
                    <span className={`ml-2 has-text-weight-semibold ${getRatingColor(item.rating)}`}>
                      {item.rating}.0
                    </span>
                  </div>
                  <span className="tag is-small is-light">
                    {item.category}
                  </span>
                </div>
                <p className="is-size-6 has-text-weight-medium font-figtree mb-1">
                  {item.customer}
                </p>
              </div>
              <span className={`tag is-small ${getFeedbackStatusColor(item.status)}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="is-flex is-align-items-flex-start">
                <MessageSquare size={16} className="has-text-grey mr-2 mt-1" />
                <p className="is-size-7 font-figtree has-text-grey-dark">
                  "{item.comment}"
                </p>
              </div>
            </div>
            
            <div className="is-flex is-align-items-center">
              <Clock size={12} className="has-text-grey mr-1" />
              <span className="is-size-7 has-text-grey font-figtree">
                {item.time}
              </span>
            </div>
          </div>
        ))}
        
        {feedback.length === 0 && (
          <div className="has-text-centered py-6">
            <Star className="has-text-grey mb-3" size={48} />
            <p className="is-size-6 has-text-grey font-figtree">
              No feedback available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerFeedback