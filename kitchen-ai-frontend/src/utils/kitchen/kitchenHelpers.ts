// src/utils/kitchen/kitchenHelpers.ts

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return 'has-background-info'
    case 'idle': return 'has-background-success'
    case 'busy': return 'has-background-warning'
    default: return 'has-background-grey'
  }
}

export const getStatusTextColor = (status: string): string => {
  switch (status) {
    case 'active': return 'has-text-info'
    case 'idle': return 'has-text-success'
    case 'busy': return 'has-text-warning'
    default: return 'has-text-grey'
  }
}

export const getActivityTypeColor = (type: string): string => {
  switch (type) {
    case 'success': return 'has-text-success'
    case 'warning': return 'has-text-warning'
    case 'info': return 'has-text-info'
    default: return 'has-text-grey'
  }
}

export const getEfficiencyProgressClass = (efficiency: number): string => {
  if (efficiency >= 90) return 'is-success'
  if (efficiency >= 80) return 'is-warning'
  return 'is-danger'
}

export const getAgentBorderColor = (status: string): string => {
  switch (status) {
    case 'active': return '#3B82F6'
    case 'busy': return '#F59E0B'
    default: return '#10B981'
  }
}