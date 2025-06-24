import { 
  FaHome, 
  FaPhone, 
  FaChartBar, 
  FaTruck,
  FaRobot,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa'

// Accurate UK Union Jack Flag - Proper proportions and colors to avoid legal issues
const UKFlag: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 60 36" className="inline-block">
    <defs>
      <clipPath id="ukFlag">
        <rect width="60" height="36"/>
      </clipPath>
    </defs>
    <g clipPath="url(#ukFlag)">
      {/* Blue field - Official Pantone 280 equivalent */}
      <rect width="60" height="36" fill="#012169"/>
      
      {/* White saltire (diagonal cross of St. Andrew) */}
      <path 
        d="M0,0 L60,36 M60,0 L0,36" 
        stroke="#FFFFFF" 
        strokeWidth="6"
        strokeLinecap="square"
      />
      
      {/* Red saltire (diagonal cross of St. Patrick) - offset properly */}
      <g>
        <path 
          d="M0,0 L60,36" 
          stroke="#C8102E" 
          strokeWidth="2"
          transform="translate(1,0)"
        />
        <path 
          d="M60,0 L0,36" 
          stroke="#C8102E" 
          strokeWidth="2"
          transform="translate(-1,0)"
        />
      </g>
      
      {/* White cross of St. George */}
      <g>
        <rect x="24" y="0" width="12" height="36" fill="#FFFFFF"/>
        <rect x="0" y="12" width="60" height="12" fill="#FFFFFF"/>
      </g>
      
      {/* Red cross of St. George - centered properly */}
      <g>
        <rect x="26" y="0" width="8" height="36" fill="#C8102E"/>
        <rect x="0" y="14" width="60" height="8" fill="#C8102E"/>
      </g>
    </g>
  </svg>
)

interface SidebarProps {
  currentDashboard: string
  onDashboardChange: (dashboard: string) => void
  isCollapsed: boolean
  onToggle: () => void
  isMobile: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentDashboard, 
  onDashboardChange, 
  isCollapsed, 
  onToggle,
  isMobile,
  onClose
}) => {
  const dashboards = [
    { 
      id: 'kitchen', 
      name: 'Kitchen Operations', 
      icon: FaHome,
      color: '#ed4c4c' // Cherry Red
    },
    { 
      id: 'customer', 
      name: 'Customer Care', 
      icon: FaPhone,
      color: '#faa09a' // Peach
    },
    { 
      id: 'business', 
      name: 'Business Analytics', 
      icon: FaChartBar,
      color: '#ed4c4c' // Cherry Red
    },
    { 
      id: 'logistics', 
      name: 'Logistics & Delivery', 
      icon: FaTruck,
      color: '#faa09a' // Peach
    },
    { 
      id: 'agents', 
      name: 'AI Agents', 
      icon: FaRobot,
      color: '#ed4c4c' // Cherry Red
    }
  ]

  const handleDashboardClick = (dashboardId: string) => {
    onDashboardChange(dashboardId)
    if (isMobile && onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 35
          }}
        />
      )}

      {/* Floating Toggle Button - Styled Better */}
      <button
        onClick={onToggle}
        className="button"
        style={{
          position: 'fixed',
          top: '50%',
          left: isCollapsed ? '20px' : '260px',
          transform: 'translateY(-50%)',
          zIndex: 50,
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          padding: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '2px solid #e9ecef',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)'
          e.currentTarget.style.borderColor = 'var(--heysalad-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
          e.currentTarget.style.borderColor = '#e9ecef'
        }}
        title={isCollapsed ? "Open Kitchen AI Menu" : "Close Kitchen AI Menu"}
      >
        {isCollapsed ? (
          <FaChevronRight 
            className="has-text-grey-dark" 
            size={16}
            style={{ transition: 'all 0.2s ease' }}
          />
        ) : (
          <FaChevronLeft 
            className="has-text-grey-dark" 
            size={16}
            style={{ transition: 'all 0.2s ease' }}
          />
        )}
      </button>

      {/* Sidebar */}
      <aside 
        className="modern-sidebar"
        style={{ 
          position: 'fixed',
          top: '70px',
          left: 0,
          width: isCollapsed ? '0' : '280px',
          height: 'calc(100vh - 70px)',
          backgroundColor: 'white',
          borderRight: '1px solid #e8e8e8',
          boxShadow: isCollapsed ? 'none' : '2px 0 8px rgba(0, 0, 0, 0.1)',
          transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 30,
          overflow: 'hidden'
        }}
      >
        <div className="p-4" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Kitchen AI Header */}
          <div className="mb-5 has-text-centered">
            <div className="has-text-centered">
              <span style={{ 
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                backgroundColor: '#ed4c4c', // Cherry Red
                color: '#ffffff', // White text
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                Kitchen AI System
              </span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="mb-5" style={{ flex: 1 }}>
            <nav className="menu">
              {dashboards.map((dashboard) => {
                const Icon = dashboard.icon
                const isActive = currentDashboard === dashboard.id
                
                return (
                  <button
                    key={dashboard.id}
                    onClick={() => handleDashboardClick(dashboard.id)}
                    className="button is-fullwidth sidebar-item mb-2"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      backgroundColor: isActive ? '#ed4c4c' : 'transparent', // Cherry Red when active
                      color: isActive ? '#ffffff' : '#333333', // White when active, dark when inactive
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <span className="icon mr-3" style={{ 
                      color: isActive ? '#ffffff' : dashboard.color,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Icon size={16} />
                    </span>
                    <span style={{
                      fontWeight: '500',
                      color: isActive ? '#ffffff' : '#333333'
                    }}>
                      {dashboard.name}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Settings Section */}
          <div className="mb-4" style={{ borderTop: '1px solid #ffd0cd', paddingTop: '1rem' }}>
            <button 
              className="button is-fullwidth sidebar-item"
              style={{
                justifyContent: 'flex-start',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <span className="icon mr-3" style={{ color: '#ed4c4c' }}>
                <FaCog size={16} />
              </span>
              <span style={{ fontWeight: '500', color: '#333333' }}>
                Settings
              </span>
            </button>
          </div>

          {/* Updated Footer - HeySalad Branding */}
          <div className="has-text-centered" style={{ borderTop: '1px solid #ffd0cd', paddingTop: '1rem' }}>
            {/* Brand Title */}
            <div className="mb-3">
              <p className="is-size-6 has-text-weight-bold mb-1">
                <span style={{ color: '#ed4c4c' }}>HeySalad</span>
                <span className="is-size-7 has-text-grey ml-1">®</span>
                <span className="has-text-grey-darker ml-1">Kitchen AI</span>
              </p>
            </div>

            {/* Company Info */}
            <div className="mb-2">
              <p className="is-size-7 has-text-grey-dark has-text-weight-medium mb-1">
                by Salad HR Technology LTD
              </p>
              <div className="is-flex is-align-items-center is-justify-content-center mb-1">
                <UKFlag size={14} />
                <span className="ml-2 is-size-7 has-text-grey">United Kingdom</span>
              </div>
            </div>

            {/* Made with Love */}
            <div className="is-flex is-align-items-center is-justify-content-center mb-2">
              <span className="is-size-7 has-text-grey-light mr-1">made with</span>
              <FaHeart style={{ color: '#ed4c4c' }} size={10} />
              <span className="is-size-7 has-text-grey-light ml-1">in London</span>
            </div>

            {/* Version Tag */}
            <div>
              <span style={{
                backgroundColor: '#ffd0cd', // Light Peach background
                color: '#ed4c4c', // Cherry Red text
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar