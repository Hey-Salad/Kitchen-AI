// src/components/kitchen/RecentActivity.tsx

import React from 'react'
import { CheckCircle2, AlertTriangle, Activity } from 'lucide-react'
import type { RecentActivity as RecentActivityType } from './types/kitchenTypes'
import { getActivityTypeColor } from '../../utils/kitchen/kitchenHelpers'

interface RecentActivityProps {
  activities: RecentActivityType[]
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="modern-card">
      <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
        Recent Activity
      </h3>
      <div className="content" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="is-flex is-align-items-center mb-3 p-2 has-background-white-bis" 
            style={{ borderRadius: '6px' }}
          >
            <div className="mr-3">
              <div className={`${getActivityTypeColor(activity.type)}`}>
                {activity.type === 'success' && <CheckCircle2 size={16} />}
                {activity.type === 'warning' && <AlertTriangle size={16} />}
                {activity.type === 'info' && <Activity size={16} />}
              </div>
            </div>
            <div className="is-flex-grow-1">
              <p className="is-size-7 font-figtree has-text-weight-medium mb-1">
                {activity.activity}
              </p>
              <p className="is-size-7 has-text-grey font-figtree">
                {activity.time} • {activity.agent}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity