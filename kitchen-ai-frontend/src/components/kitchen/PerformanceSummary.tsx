// src/components/kitchen/PerformanceSummary.tsx

import React from 'react'

const PerformanceSummary: React.FC = () => {
  return (
    <div className="modern-card">
      <h3 className="title is-5 font-grandstander has-text-grey-darker mb-4">
        Today's Performance
      </h3>
      <div className="content">
        <div className="columns is-mobile mb-3">
          <div className="column">
            <div 
              className="has-text-centered p-3 has-background-success-light" 
              style={{ borderRadius: '8px' }}
            >
              <p className="title is-6 font-grandstander has-text-success-dark mb-1">
                47
              </p>
              <p className="is-size-7 has-text-success-dark font-figtree">
                Orders Completed
              </p>
            </div>
          </div>
          <div className="column">
            <div 
              className="has-text-centered p-3 has-background-info-light" 
              style={{ borderRadius: '8px' }}
            >
              <p className="title is-6 font-grandstander has-text-info-dark mb-1">
                12.3m
              </p>
              <p className="is-size-7 has-text-info-dark font-figtree">
                Avg Prep Time
              </p>
            </div>
          </div>
        </div>
        
        <div className="columns is-mobile mb-3">
          <div className="column">
            <div 
              className="has-text-centered p-3 has-background-primary-light" 
              style={{ borderRadius: '8px' }}
            >
              <p className="title is-6 font-grandstander has-text-primary-dark mb-1">
                94%
              </p>
              <p className="is-size-7 has-text-primary-dark font-figtree">
                Quality Score
              </p>
            </div>
          </div>
          <div className="column">
            <div 
              className="has-text-centered p-3 has-background-warning-light" 
              style={{ borderRadius: '8px' }}
            >
              <p className="title is-6 font-grandstander has-text-warning-dark mb-1">
                4.8/5
              </p>
              <p className="is-size-7 has-text-warning-dark font-figtree">
                Customer Rating
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #dbdbdb' }}>
          <div className="is-flex is-align-items-center is-justify-content-space-between mb-2">
            <span className="is-size-7 has-text-grey-dark font-figtree">
              Overall Efficiency
            </span>
            <div className="is-flex is-align-items-center">
              <progress 
                className="progress is-success is-small mr-2" 
                value="92" 
                max="100" 
                style={{ width: '60px' }}
              >
                92%
              </progress>
              <span className="is-size-7 has-text-weight-semibold has-text-success font-figtree">
                92%
              </span>
            </div>
          </div>
          <div className="is-flex is-align-items-center is-justify-content-space-between">
            <span className="is-size-7 has-text-grey-dark font-figtree">
              Safety Compliance
            </span>
            <div className="is-flex is-align-items-center">
              <progress 
                className="progress is-primary is-small mr-2" 
                value="98" 
                max="100" 
                style={{ width: '60px' }}
              >
                98%
              </progress>
              <span className="is-size-7 has-text-weight-semibold has-text-primary font-figtree">
                98%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceSummary