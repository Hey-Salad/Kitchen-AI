// src/pages/CustomerDashboard.tsx

import React from 'react'
import { Headphones, Clock, Users, Star, AlertTriangle } from 'lucide-react'

// Component imports
import CustomerMetrics from '../components/customer/CustomerMetrics'
import TicketQueue from '../components/customer/TicketQueue'
import SatisfactionChart from '../components/customer/SatisfactionChart'
import SupportChannels from '../components/customer/SupportChannels'
import AgentPerformanceTable from '../components/customer/AgentPerformanceTable'
import RecentInteractions from '../components/customer/RecentInteractions'
import CustomerFeedbackComponent from '../components/customer/CustomerFeedback'
import CustomerQuickActions from '../components/customer/CustomerQuickActions'

// Type imports
import type {
  CustomerMetric,
  CustomerTicket,
  CustomerSatisfactionData,
  SupportChannelData,
  AgentPerformanceData,
  CustomerInteraction,
  CustomerFeedback as CustomerFeedbackType
} from '../components/customer/types/customerTypes'

const CustomerDashboard: React.FC = () => {
  // Sample data - move this to a service/hook in real implementation
  const metrics: CustomerMetric[] = [
    {
      title: 'Active Tickets',
      value: '47',
      change: '+5 today',
      trend: 'up',
      icon: Headphones,
      color: 'has-text-info',
      bgColor: 'has-background-info-light',
      status: 'normal'
    },
    {
      title: 'Avg Response Time',
      value: '12m',
      change: '-2m from yesterday',
      trend: 'up',
      icon: Clock,
      color: 'has-text-success',
      bgColor: 'has-background-success-light',
      status: 'good'
    },
    {
      title: 'Satisfaction Score',
      value: '4.7/5',
      change: '+0.2 this week',
      trend: 'up',
      icon: Star,
      color: 'has-text-warning',
      bgColor: 'has-background-warning-light',
      status: 'excellent'
    },
    {
      title: 'Agents Online',
      value: '8/10',
      change: '2 away',
      trend: 'stable',
      icon: Users,
      color: 'has-text-primary',
      bgColor: 'has-background-primary-light',
      status: 'good'
    }
  ]

  const activeTickets: CustomerTicket[] = [
    {
      id: 'TK-2024-001',
      customer: 'Sarah Johnson',
      subject: 'Order delivery issue - missing items',
      status: 'open',
      priority: 'high',
      created: '2 hours ago',
      lastUpdate: '30 min ago',
      agent: 'Mike Chen',
      category: 'Delivery'
    },
    {
      id: 'TK-2024-002',
      customer: 'David Wilson',
      subject: 'Payment processing error',
      status: 'pending',
      priority: 'urgent',
      created: '4 hours ago',
      lastUpdate: '1 hour ago',
      agent: 'Lisa Smith',
      category: 'Payment'
    },
    {
      id: 'TK-2024-003',
      customer: 'Emma Brown',
      subject: 'App login problems',
      status: 'escalated',
      priority: 'medium',
      created: '6 hours ago',
      lastUpdate: '3 hours ago',
      category: 'Technical'
    },
    {
      id: 'TK-2024-004',
      customer: 'John Davis',
      subject: 'Refund request for cancelled order',
      status: 'open',
      priority: 'low',
      created: '8 hours ago',
      lastUpdate: '5 hours ago',
      agent: 'Anna Lee',
      category: 'Refund'
    },
    {
      id: 'TK-2024-005',
      customer: 'Maria Garcia',
      subject: 'Account verification issues',
      status: 'pending',
      priority: 'medium',
      created: '1 day ago',
      lastUpdate: '6 hours ago',
      agent: 'James Wilson',
      category: 'Account'
    },
    {
      id: 'TK-2024-006',
      customer: 'Robert Taylor',
      subject: 'Subscription cancellation request',
      status: 'open',
      priority: 'low',
      created: '1 day ago',
      lastUpdate: '8 hours ago',
      category: 'Billing'
    }
  ]

  const satisfactionData: CustomerSatisfactionData[] = [
    { period: 'Mon', satisfaction: 4.2, responseTime: 15, resolution: 85 },
    { period: 'Tue', satisfaction: 4.4, responseTime: 12, resolution: 88 },
    { period: 'Wed', satisfaction: 4.3, responseTime: 14, resolution: 82 },
    { period: 'Thu', satisfaction: 4.6, responseTime: 10, resolution: 92 },
    { period: 'Fri', satisfaction: 4.7, responseTime: 12, resolution: 90 },
    { period: 'Sat', satisfaction: 4.5, responseTime: 11, resolution: 89 },
    { period: 'Sun', satisfaction: 4.8, responseTime: 9, resolution: 94 }
  ]

  const supportChannels: SupportChannelData[] = [
    { channel: 'Live Chat', tickets: 156, avgResponseTime: 8, satisfaction: 4.8, color: '#10B981' },
    { channel: 'Email', tickets: 89, avgResponseTime: 45, satisfaction: 4.5, color: '#3B82F6' },
    { channel: 'Phone', tickets: 67, avgResponseTime: 3, satisfaction: 4.9, color: '#F59E0B' },
    { channel: 'Social Media', tickets: 23, avgResponseTime: 25, satisfaction: 4.2, color: '#8B5CF6' }
  ]

  const agentPerformance: AgentPerformanceData[] = [
    { agent: 'Mike Chen', ticketsResolved: 23, avgResponseTime: 8, satisfaction: 4.9, status: 'online', currentTickets: 5 },
    { agent: 'Lisa Smith', ticketsResolved: 31, avgResponseTime: 6, satisfaction: 4.8, status: 'busy', currentTickets: 7 },
    { agent: 'Anna Lee', ticketsResolved: 18, avgResponseTime: 12, satisfaction: 4.6, status: 'online', currentTickets: 3 },
    { agent: 'James Wilson', ticketsResolved: 27, avgResponseTime: 10, satisfaction: 4.7, status: 'away', currentTickets: 2 },
    { agent: 'Sophie Turner', ticketsResolved: 22, avgResponseTime: 9, satisfaction: 4.8, status: 'online', currentTickets: 6 }
  ]

  const recentInteractions: CustomerInteraction[] = [
    {
      id: 'INT-001',
      customer: 'Sarah Johnson',
      type: 'chat',
      subject: 'Order status inquiry - tracking number request',
      time: '5 min ago',
      duration: '8 min',
      status: 'completed',
      agent: 'Mike Chen'
    },
    {
      id: 'INT-002',
      customer: 'David Wilson',
      type: 'call',
      subject: 'Payment dispute - unauthorized charge',
      time: '12 min ago',
      duration: '15 min',
      status: 'active',
      agent: 'Lisa Smith'
    },
    {
      id: 'INT-003',
      customer: 'Emma Brown',
      type: 'email',
      subject: 'Account access issue - password reset',
      time: '25 min ago',
      status: 'waiting',
      agent: 'Anna Lee'
    },
    {
      id: 'INT-004',
      customer: 'John Davis',
      type: 'social',
      subject: 'Public complaint response - delivery delay',
      time: '1 hour ago',
      duration: '12 min',
      status: 'completed',
      agent: 'Sophie Turner'
    },
    {
      id: 'INT-005',
      customer: 'Maria Garcia',
      type: 'chat',
      subject: 'Verification documents upload help',
      time: '1.5 hours ago',
      duration: '20 min',
      status: 'completed',
      agent: 'James Wilson'
    },
    {
      id: 'INT-006',
      customer: 'Robert Taylor',
      type: 'email',
      subject: 'Subscription terms clarification',
      time: '2 hours ago',
      status: 'waiting',
      agent: 'Mike Chen'
    },
    {
      id: 'INT-007',
      customer: 'Jennifer Lee',
      type: 'call',
      subject: 'Billing inquiry - promotional discount',
      time: '3 hours ago',
      duration: '10 min',
      status: 'completed',
      agent: 'Anna Lee'
    },
    {
      id: 'INT-008',
      customer: 'Michael Brown',
      type: 'chat',
      subject: 'Product recommendation request',
      time: '4 hours ago',
      duration: '6 min',
      status: 'completed',
      agent: 'Sophie Turner'
    },
    {
      id: 'INT-009',
      customer: 'Lisa Wang',
      type: 'social',
      subject: 'Feature suggestion feedback',
      time: '5 hours ago',
      duration: '8 min',
      status: 'completed',
      agent: 'Lisa Smith'
    },
    {
      id: 'INT-010',
      customer: 'Carlos Rodriguez',
      type: 'email',
      subject: 'Order modification request',
      time: '6 hours ago',
      status: 'active',
      agent: 'James Wilson'
    }
  ]

  const customerFeedback: CustomerFeedbackType[] = [
    {
      id: 'FB-001',
      customer: 'Rachel Green',
      rating: 5,
      comment: 'Excellent service! The support team resolved my issue quickly and professionally. Mike was very helpful and patient.',
      category: 'Service Quality',
      time: '2 hours ago',
      status: 'new'
    },
    {
      id: 'FB-002',
      customer: 'Michael Scott',
      rating: 4,
      comment: 'Good experience overall, though the wait time was a bit long. The agent was knowledgeable and solved my problem.',
      category: 'Response Time',
      time: '4 hours ago',
      status: 'reviewed'
    },
    {
      id: 'FB-003',
      customer: 'Pam Beesly',
      rating: 3,
      comment: 'The issue was resolved but the process was confusing. Could use better documentation or clearer instructions.',
      category: 'Process',
      time: '6 hours ago',
      status: 'responded'
    },
    {
      id: 'FB-004',
      customer: 'Jim Halpert',
      rating: 5,
      comment: 'Amazing support! Very helpful and friendly staff. Sophie went above and beyond to help me with my order.',
      category: 'Service Quality',
      time: '8 hours ago',
      status: 'responded'
    },
    {
      id: 'FB-005',
      customer: 'Dwight Schrute',
      rating: 2,
      comment: 'Response was slow and the first agent did not understand my technical issue. Had to escalate to get proper help.',
      category: 'Technical Support',
      time: '1 day ago',
      status: 'reviewed'
    },
    {
      id: 'FB-006',
      customer: 'Angela Martin',
      rating: 4,
      comment: 'Professional service, quick resolution. The billing issue was handled efficiently.',
      category: 'Billing',
      time: '1 day ago',
      status: 'responded'
    }
  ]

  return (
    <div className="container is-fluid">
      {/* Header */}
      <div className="mb-6">
        <h1 className="title is-2 font-grandstander has-text-grey-darker mb-2">
          Customer Support Dashboard
        </h1>
        <p className="subtitle is-5 font-figtree has-text-grey">
          Monitor support operations, agent performance, and customer satisfaction
        </p>
      </div>

      {/* KPI Metrics */}
      <CustomerMetrics metrics={metrics} />

      {/* Main Content Row */}
      <div className="columns is-multiline mb-6">
        {/* Active Tickets */}
        <div className="column is-12-tablet is-6-desktop">
          <TicketQueue tickets={activeTickets} />
        </div>

        {/* Satisfaction Chart */}
        <div className="column is-12-tablet is-6-desktop">
          <SatisfactionChart data={satisfactionData} />
        </div>
      </div>

      {/* Support Channels & Agent Performance */}
      <div className="columns is-multiline mb-6">
        <div className="column is-12-tablet is-5-desktop">
          <SupportChannels data={supportChannels} chartType="pie" />
        </div>
        <div className="column is-12-tablet is-7-desktop">
          <AgentPerformanceTable agents={agentPerformance} />
        </div>
      </div>

      {/* Bottom Section: Quick Actions, Interactions, and Feedback */}
      <div className="columns is-multiline mb-6">
        <div className="column is-12-tablet is-4-desktop">
          <CustomerQuickActions />
        </div>
        <div className="column is-12-tablet is-4-desktop">
          <RecentInteractions interactions={recentInteractions} />
        </div>
        <div className="column is-12-tablet is-4-desktop">
          <CustomerFeedbackComponent feedback={customerFeedback} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="columns is-multiline">
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-success-light" style={{ borderLeft: '4px solid #10B981' }}>
            <div className="is-flex is-align-items-center mb-3">
              <Star className="has-text-success mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-success-dark mb-0">
                Customer Satisfaction
              </h4>
            </div>
            <p className="is-size-7 has-text-success-dark font-figtree mb-2">
              Average satisfaction score improved by 0.2 points this week
            </p>
            <span className="tag is-success is-small">Excellent Performance</span>
          </div>
        </div>
        
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-info-light" style={{ borderLeft: '4px solid #3B82F6' }}>
            <div className="is-flex is-align-items-center mb-3">
              <Clock className="has-text-info mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-info-dark mb-0">
                Response Time
              </h4>
            </div>
            <p className="is-size-7 has-text-info-dark font-figtree mb-2">
              Average response time under target of 15 minutes
            </p>
            <span className="tag is-info is-small">On Target</span>
          </div>
        </div>
        
        <div className="column is-12-tablet is-4-desktop">
          <div className="modern-card has-background-warning-light" style={{ borderLeft: '4px solid #F59E0B' }}>
            <div className="is-flex is-align-items-center mb-3">
              <AlertTriangle className="has-text-warning mr-3" size={24} />
              <h4 className="title is-6 font-grandstander has-text-warning-dark mb-0">
                Urgent Tickets
              </h4>
            </div>
            <p className="is-size-7 has-text-warning-dark font-figtree mb-2">
              3 urgent tickets require immediate attention
            </p>
            <span className="tag is-warning is-small">Action Required</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard