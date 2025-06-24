import { useState } from 'react'
import { FaMicrophone, FaCamera, FaBell, FaCog, } from 'react-icons/fa'

const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="navbar modern-header" role="navigation" style={{ height: '70px', zIndex: 40 }}>
      <div className="navbar-brand">
        <div className="navbar-item" style={{ padding: '0.5rem 1rem' }}>
          {/* Properly sized logo */}
          <img 
            src="/HeySalad Logo Black.png"
            alt="HeySalad Logo" 
            style={{
              height: '45px',
              width: 'auto',
              maxHeight: '45px'
            }}
            onError={(e) => {
              e.currentTarget.src = "https://heysalad.app/HeySalad%20Logo%20Black.png"
            }}
          />
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons is-align-items-center" style={{ gap: '8px' }}>
              {/* Voice Command Button */}
              <button 
                className="button"
                style={{
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  height: '40px',
                  backgroundColor: '#ed4c4c', // Cherry Red
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d63447' // Slightly darker red on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ed4c4c'
                }}
              >
                <span className="icon is-small">
                  <FaMicrophone />
                </span>
                <span className="is-hidden-mobile has-text-weight-semibold">Voice</span>
              </button>

              {/* Camera Button */}
              <button 
                className="button"
                style={{
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  height: '40px',
                  backgroundColor: '#faa09a', // Peach
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8887a' // Slightly darker peach on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#faa09a'
                }}
              >
                <span className="icon is-small">
                  <FaCamera />
                </span>
                <span className="is-hidden-mobile has-text-weight-semibold">Camera</span>
              </button>

              {/* Notifications Button */}
              <button 
                className="button"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #ffd0cd', // Light Peach border
                  position: 'relative',
                  height: '40px',
                  width: '40px',
                  padding: '0',
                  backgroundColor: '#ffffff', // White background
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              >
                <span className="icon is-small">
                  <FaBell style={{ color: '#ed4c4c' }} /> {/* Cherry Red icon */}
                </span>
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    right: '-6px',
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: '9px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ed4c4c', // Cherry Red background
                    color: '#ffffff', // White text
                    border: '2px solid #ffffff' // White border for contrast
                  }}>
                  3
                </span>
              </button>

              {/* Live Status */}
              <div style={{ 
                borderRadius: '8px', 
                overflow: 'hidden', 
                margin: '0',
                display: 'flex',
                height: '40px',
                alignItems: 'center'
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  height: '40px',
                  paddingLeft: '12px',
                  paddingRight: '8px',
                  backgroundColor: '#faa09a', // Peach background
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px'
                }}>
                  <span 
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: '#ffffff', // White dot
                      marginRight: '6px',
                      animation: 'pulseAnimation 2s infinite'
                    }}
                  ></span>
                </span>
                <span style={{ 
                  height: '40px',
                  paddingLeft: '8px',
                  paddingRight: '12px',
                  backgroundColor: '#ffd0cd', // Light Peach background
                  color: '#ed4c4c', // Cherry Red text
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px'
                }}>
                  Live System
                </span>
              </div>
            </div>
          </div>

          {/* User Menu - Clean Single Icon */}
          <div className={`navbar-item has-dropdown ${showUserMenu ? 'is-active' : ''}`}>
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                borderRadius: '8px',
                padding: '4px',
                border: 'none',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {/* Single User Avatar with Initials */}
              <div style={{ 
                 width: '40px', 
                 height: '40px', 
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease',
                 backgroundColor: '#ed4c4c' // Cherry Red background
               }}>
                <span style={{ 
                  color: '#ffffff', // White text
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}>
                  KM
                </span>
              </div>
            </div>
            
            <div className="navbar-dropdown is-right" style={{ 
              borderRadius: '8px', 
              marginTop: '4px', 
              minWidth: '200px',
              backgroundColor: '#ffffff', // White background
              border: '1px solid #ffd0cd', // Light Peach border
              boxShadow: '0 4px 12px rgba(237, 76, 76, 0.1)' // Cherry Red shadow
            }}>
              <div className="navbar-item">
                <div className="content">
                  <p style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#ed4c4c', // Cherry Red
                    marginBottom: '0.25rem'
                  }}>
                    Kitchen Manager
                  </p>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#666666',
                    marginBottom: '0'
                  }}>
                    admin@heysalad.com
                  </p>
                </div>
              </div>
              <hr style={{ 
                backgroundColor: '#ffd0cd', // Light Peach divider
                height: '1px',
                margin: '0.5rem 0'
              }} />
              <a className="navbar-item" style={{
                color: '#ed4c4c', // Cherry Red text
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}>
                <FaCog style={{ marginRight: '8px', color: '#ed4c4c' }} />
                Settings & Preferences
              </a>
              <a className="navbar-item" style={{
                color: '#ed4c4c', // Cherry Red text
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd0cd' // Light Peach on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}>
                <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add pulse animation for live indicator */}
      <style>{`
        @keyframes pulseAnimation {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  )
}

export default Header