// src/components/customer/CustomerQuickActions.tsx

import React from 'react'
import { Plus, MessageCircle, Phone, Mail, Search, Users } from 'lucide-react'

const CustomerQuickActions: React.FC = () => {
  return (
    <div className="modern-card">
      <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
        Quick Actions
      </h3>
      <div className="columns is-multiline is-mobile">
        <div className="column is-6">
          <button 
            className="button is-heysalad-primary is-fullwidth p-4" 
            style={{ height: '80px' }}
          >
            <div className="has-text-centered">
              <Plus className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                New Ticket
              </span>
            </div>
          </button>
        </div>
        <div className="column is-6">
          <button 
            className="button is-heysalad-secondary is-fullwidth p-4" 
            style={{ height: '80px' }}
          >
            <div className="has-text-centered">
              <MessageCircle className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Live Chat
              </span>
            </div>
          </button>
        </div>
        <div className="column is-6">
          <button 
            className="button is-light is-fullwidth p-4" 
            style={{ height: '80px', border: '1px solid #dbdbdb' }}
          >
            <div className="has-text-centered">
              <Phone className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Call Queue
              </span>
            </div>
          </button>
        </div>
        <div className="column is-6">
          <button 
            className="button is-light is-fullwidth p-4" 
            style={{ height: '80px', border: '1px solid #dbdbdb' }}
          >
            <div className="has-text-centered">
              <Search className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Search
              </span>
            </div>
          </button>
        </div>
        <div className="column is-6">
          <button 
            className="button is-light is-fullwidth p-4" 
            style={{ height: '80px', border: '1px solid #dbdbdb' }}
          >
            <div className="has-text-centered">
              <Mail className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Email
              </span>
            </div>
          </button>
        </div>
        <div className="column is-6">
          <button 
            className="button is-light is-fullwidth p-4" 
            style={{ height: '80px', border: '1px solid #dbdbdb' }}
          >
            <div className="has-text-centered">
              <Users className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Customers
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerQuickActions