// src/components/customer/CustomerMetrics.tsx

import React from 'react'
import { TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react'
import type { CustomerMetric } from './types/customerTypes'

interface CustomerMetricsProps {
  metrics: CustomerMetric[]
}

const CustomerMetrics: React.FC<CustomerMetricsProps> = ({ metrics }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="has-text-success" />
      case 'down': return <TrendingDown size={14} className="has-text-danger" />
      default: return <CheckCircle2 size={14} className="has-text-info" />
    }
  }

  return (
    <div className="columns is-multiline mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        
        return (
          <div key={index} className="column is-12-mobile is-6-tablet is-3-desktop">
            <div className="modern-card" style={{ height: '140px' }}>
              <div className="is-flex is-justify-content-space-between is-align-items-flex-start mb-3">
                <div className="is-flex-grow-1">
                  <p className="is-size-7 has-text-weight-medium has-text-grey-dark mb-2 font-figtree">
                    {metric.title}
                  </p>
                  <p className="title is-3 font-grandstander has-text-grey-darker mb-2">
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 ${metric.bgColor}`} style={{ borderRadius: '12px' }}>
                  <Icon className={`${metric.color}`} size={20} />
                </div>
              </div>
              <div className="is-flex is-align-items-center">
                {getTrendIcon(metric.trend)}
                <span className="is-size-7 has-text-weight-medium font-figtree ml-2">
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CustomerMetrics