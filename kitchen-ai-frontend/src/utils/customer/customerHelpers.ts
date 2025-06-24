// src/utils/customer/customerHelpers.ts

export const getTicketStatusColor = (status: string): string => {
  switch (status) {
    case 'open': return 'has-background-info'
    case 'pending': return 'has-background-warning'
    case 'resolved': return 'has-background-success'
    case 'escalated': return 'has-background-danger'
    default: return 'has-background-grey'
  }
}

export const getTicketStatusTextColor = (status: string): string => {
  switch (status) {
    case 'open': return 'has-text-info'
    case 'pending': return 'has-text-warning'
    case 'resolved': return 'has-text-success'
    case 'escalated': return 'has-text-danger'
    default: return 'has-text-grey'
  }
}

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent': return 'has-background-danger'
    case 'high': return 'has-background-warning'
    case 'medium': return 'has-background-info'
    case 'low': return 'has-background-success'
    default: return 'has-background-grey'
  }
}

export const getPriorityTextColor = (priority: string): string => {
  switch (priority) {
    case 'urgent': return 'has-text-danger'
    case 'high': return 'has-text-warning'
    case 'medium': return 'has-text-info'
    case 'low': return 'has-text-success'
    default: return 'has-text-grey'
  }
}

export const getAgentStatusColor = (status: string): string => {
  switch (status) {
    case 'online': return 'has-background-success'
    case 'busy': return 'has-background-warning'
    case 'away': return 'has-background-info'
    case 'offline': return 'has-background-grey'
    default: return 'has-background-grey'
  }
}

export const getAgentStatusTextColor = (status: string): string => {
  switch (status) {
    case 'online': return 'has-text-success'
    case 'busy': return 'has-text-warning'
    case 'away': return 'has-text-info'
    case 'offline': return 'has-text-grey'
    default: return 'has-text-grey'
  }
}

export const getInteractionTypeIcon = (type: string): string => {
  switch (type) {
    case 'call': return 'fas fa-phone'
    case 'email': return 'fas fa-envelope'
    case 'chat': return 'fas fa-comments'
    case 'social': return 'fas fa-share-alt'
    default: return 'fas fa-question'
  }
}

export const getInteractionTypeColor = (type: string): string => {
  switch (type) {
    case 'call': return 'has-text-success'
    case 'email': return 'has-text-info'
    case 'chat': return 'has-text-warning'
    case 'social': return 'has-text-primary'
    default: return 'has-text-grey'
  }
}

export const formatResponseTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return 'has-text-success'
  if (rating >= 3.5) return 'has-text-warning'
  return 'has-text-danger'
}

export const getFeedbackStatusColor = (status: string): string => {
  switch (status) {
    case 'new': return 'has-background-info'
    case 'reviewed': return 'has-background-warning'
    case 'responded': return 'has-background-success'
    default: return 'has-background-grey'
  }
}