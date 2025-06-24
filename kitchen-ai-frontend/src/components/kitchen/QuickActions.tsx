// src/components/kitchen/QuickActions.tsx

import React from 'react'
import { Activity, Thermometer, Users, AlertTriangle } from 'lucide-react'

const QuickActions: React.FC = () => {
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
              <Activity className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Check Orders
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
              <Thermometer className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                Monitor Temp
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
                Staff Status
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
              <AlertTriangle className="mb-2" size={24} />
              <span className="is-size-7 font-figtree has-text-weight-medium">
                View Alerts
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickActions