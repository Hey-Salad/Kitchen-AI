#!/bin/bash

echo "🍅 HeySalad Kitchen AI - Bulma UI Modernization"
echo "=============================================="
echo ""
echo "Using Bulma CSS framework for faster development!"
echo ""

# Check if we're in a React project
if [ ! -f "package.json" ]; then
    echo "❌ Error: No package.json found. Please run this script from your React project root directory."
    exit 1
fi

echo "📁 Detected React project. Starting Bulma UI modernization..."
echo ""

# Create backup directory
BACKUP_DIR="ui_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "💾 Creating backup in $BACKUP_DIR..."

# Backup existing files
if [ -d "src/components" ]; then
    cp -r src/components "$BACKUP_DIR/"
fi
if [ -d "src/pages" ]; then
    cp -r src/pages "$BACKUP_DIR/"
fi
if [ -f "src/App.tsx" ]; then
    cp src/App.tsx "$BACKUP_DIR/"
fi
if [ -f "src/App.css" ]; then
    cp src/App.css "$BACKUP_DIR/"
fi

echo "✅ Backup created successfully!"
echo ""

# Install Bulma and required dependencies
echo "📦 Installing Bulma and dependencies..."
npm install bulma react-icons lucide-react

# Create directories if they don't exist
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/pages
mkdir -p src/hooks

echo "📁 Directory structure prepared."
echo ""

# 1. Update App.css with Bulma + custom styles
echo "🎨 Creating modern Bulma-based styles..."
cat > src/App.css << 'EOF'
/* Import Bulma CSS Framework */
@import '~bulma/css/bulma.min.css';

/* Google Fonts for HeySalad branding */
@import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@400;500;600;700;800&family=Figtree:wght@300;400;500;600;700&display=swap');

/* HeySalad Custom Variables */
:root {
  --heysalad-primary: #ed4c4c;
  --heysalad-secondary: #ff8c42;
  --heysalad-accent: #ffd0cd;
  --heysalad-dark: #2d3748;
  --heysalad-light: #f7fafc;
}

/* Global Smooth Transitions */
* {
  transition: all 0.3s ease !important;
}

/* Custom HeySalad Colors for Bulma */
.has-background-heysalad-primary {
  background-color: var(--heysalad-primary) !important;
}

.has-background-heysalad-secondary {
  background-color: var(--heysalad-secondary) !important;
}

.has-background-heysalad-accent {
  background-color: var(--heysalad-accent) !important;
}

.has-text-heysalad-primary {
  color: var(--heysalad-primary) !important;
}

.has-text-heysalad-secondary {
  color: var(--heysalad-secondary) !important;
}

/* Custom Button Styles */
.button.is-heysalad-primary {
  background-color: var(--heysalad-primary);
  border-color: var(--heysalad-primary);
  color: white;
}

.button.is-heysalad-primary:hover {
  background-color: #d43d3d;
  border-color: #d43d3d;
}

.button.is-heysalad-secondary {
  background-color: var(--heysalad-secondary);
  border-color: var(--heysalad-secondary);
  color: white;
}

.button.is-heysalad-secondary:hover {
  background-color: #e67a36;
  border-color: #e67a36;
}

/* Modern Card Styles */
.modern-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.modern-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Sidebar Styles */
.modern-sidebar {
  background: white;
  border-right: 1px solid #e8e8e8;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 30;
  overflow-y: auto;
}

.sidebar-collapsed {
  transform: translateX(-100%);
}

.sidebar-expanded {
  transform: translateX(0);
}

.sidebar-toggle {
  position: absolute;
  right: -15px;
  top: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.sidebar-toggle:hover {
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-item {
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: none;
  text-align: left;
}

.sidebar-item:hover {
  background: #f8f9fa;
  transform: translateX(4px);
}

.sidebar-item.is-active {
  background: var(--heysalad-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(237, 76, 76, 0.3);
}

/* Header Styles */
.modern-header {
  background: white;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: 120px;
}

/* Content Area */
.main-content {
  margin-top: 120px;
  margin-left: 0;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.main-content.sidebar-open {
  margin-left: 280px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .modern-sidebar {
    width: 280px !important;
  }
  
  .main-content {
    margin-left: 0 !important;
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 25;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--heysalad-primary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d43d3d;
}

/* Status Indicators */
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.status-online {
  background: #48c774;
  animation: pulse 2s infinite;
}

.status-offline {
  background: #f14668;
}

.status-warning {
  background: #ffdd57;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(72, 199, 116, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(72, 199, 116, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(72, 199, 116, 0);
  }
}

/* Font Families */
.font-grandstander {
  font-family: 'Grandstander', cursive;
}

.font-figtree {
  font-family: 'Figtree', sans-serif;
}

/* Apply fonts to specific elements */
body {
  font-family: 'Figtree', sans-serif;
}

h1, h2, h3, h4, h5, h6, .title, .subtitle {
  font-family: 'Grandstander', cursive;
}

/* Loading Animation */
.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--heysalad-primary);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Notification Styles */
.notification.is-heysalad-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification.is-heysalad-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.notification.is-heysalad-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Dashboard Metrics */
.metric-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;
}

.metric-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Agent Status Cards */
.agent-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.agent-card:hover {
  border-color: var(--heysalad-primary);
  box-shadow: 0 4px 12px rgba(237, 76, 76, 0.1);
}

/* Quick Action Buttons */
.quick-action {
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.quick-action:hover {
  border-color: var(--heysalad-primary);
  background: var(--heysalad-accent);
  transform: translateY(-2px);
}

/* Table Styles */
.modern-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.modern-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
  border: none;
  padding: 1rem;
}

.modern-table td {
  border: none;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.modern-table tr:last-child td {
  border-bottom: none;
}

/* Mobile Responsive Helpers */
@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }
  
  .modern-header {
    height: 80px;
  }
  
  .main-content {
    margin-top: 80px;
    padding: 1rem;
  }
}
EOF

# 2. Create sidebar hook
echo "🪝 Creating sidebar state hook..."
cat > src/hooks/useSidebar.tsx << 'EOF'
import { useState, useEffect } from 'react'

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 769 // Bulma tablet breakpoint
      setIsMobile(mobile)
      // Auto-collapse on mobile
      if (mobile) {
        setIsCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return {
    isCollapsed,
    isMobile,
    toggleSidebar,
    setIsCollapsed
  }
}
EOF

# 3. Create modern Bulma sidebar
echo "📱 Creating modern Bulma sidebar..."
cat > src/components/layout/Sidebar.tsx << 'EOF'
import React from 'react'
import { 
  FaHome, 
  FaPhone, 
  FaChartBar, 
  FaTruck,
  FaRobot,
  FaCog,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

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
      name: 'Main Kitchen', 
      icon: FaHome,
      description: 'Operations Overview',
      color: 'has-text-info'
    },
    { 
      id: 'customer', 
      name: 'Customer Care', 
      icon: FaPhone,
      description: 'Support & Communication',
      color: 'has-text-success'
    },
    { 
      id: 'business', 
      name: 'Business Analytics', 
      icon: FaChartBar,
      description: 'Reports & Insights',
      color: 'has-text-warning'
    },
    { 
      id: 'logistics', 
      name: 'Logistics & Delivery', 
      icon: FaTruck,
      description: 'Supply Chain',
      color: 'has-text-danger'
    },
    { 
      id: 'agents', 
      name: 'AI Agents', 
      icon: FaRobot,
      description: 'Agent Management',
      color: 'has-text-heysalad-primary'
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
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`modern-sidebar ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
        style={{ 
          width: isCollapsed ? '0' : '280px',
          marginTop: isMobile ? '0' : '120px',
          height: isMobile ? '100vh' : 'calc(100vh - 120px)'
        }}
      >
        {/* Toggle Button */}
        <div className="sidebar-toggle" onClick={onToggle}>
          {isCollapsed ? (
            <FaChevronRight className="has-text-grey" />
          ) : (
            <FaChevronLeft className="has-text-grey" />
          )}
        </div>

        <div className="p-4">
          {/* Logo Section */}
          <div className="mb-6 has-text-centered">
            <div className="is-flex is-align-items-center">
              <div className="has-background-heysalad-primary p-2 mr-3" style={{ borderRadius: '8px' }}>
                <FaRobot className="has-text-white" size={20} />
              </div>
              <div>
                <h2 className="title is-5 mb-1 font-grandstander has-text-heysalad-primary">Kitchen AI</h2>
                <p className="subtitle is-7 has-text-grey font-figtree">HeySalad Powered</p>
              </div>
            </div>
          </div>

          {/* Dashboards Section */}
          <div className="mb-6">
            <p className="has-text-weight-bold is-size-7 has-text-grey-dark mb-3 is-uppercase has-text-centered-mobile">
              DASHBOARDS
            </p>
            <div className="menu-list">
              {dashboards.map((dashboard) => {
                const Icon = dashboard.icon
                const isActive = currentDashboard === dashboard.id
                
                return (
                  <button
                    key={dashboard.id}
                    onClick={() => handleDashboardClick(dashboard.id)}
                    className={`button is-fullwidth is-justify-content-flex-start sidebar-item p-4 ${
                      isActive ? 'is-active' : 'is-white'
                    }`}
                  >
                    <span className={`icon mr-3 ${isActive ? 'has-text-white' : dashboard.color}`}>
                      <Icon size={20} />
                    </span>
                    <div className="is-flex-grow-1 has-text-left">
                      <p className={`has-text-weight-semibold mb-1 font-figtree ${isActive ? 'has-text-white' : 'has-text-grey-dark'}`}>
                        {dashboard.name}
                      </p>
                      <p className={`is-size-7 font-figtree ${isActive ? 'has-text-white' : 'has-text-grey'}`}>
                        {dashboard.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <button className="button is-fullwidth is-justify-content-flex-start sidebar-item p-4 is-white">
              <span className="icon mr-3 has-text-grey-dark">
                <FaCog size={20} />
              </span>
              <span className="has-text-weight-semibold has-text-grey-dark font-figtree">Settings</span>
            </button>
          </div>

          {/* Footer */}
          <div className="has-text-centered mt-6 pt-4" style={{ borderTop: '1px solid #e8e8e8' }}>
            <p className="is-size-7 has-text-grey-light has-text-weight-semibold font-figtree">
              Powered by HeySalad
            </p>
            <p className="is-size-7 has-text-grey-light font-figtree">
              ADK Hackathon 2025
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
EOF

# 4. Create modern header
echo "🎯 Creating modern header..."
cat > src/components/layout/Header.tsx << 'EOF'
import React, { useState } from 'react'
import { FaMicrophone, FaCamera, FaBell, FaCog, FaChevronDown, FaBars } from 'react-icons/fa'

interface HeaderProps {
  onToggleSidebar: () => void
  isSidebarCollapsed: boolean
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="navbar modern-header" role="navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          {/* Mobile Menu Button */}
          <button
            className="button is-white mr-3 is-hidden-desktop"
            onClick={onToggleSidebar}
          >
            <span className="icon">
              <FaBars />
            </span>
          </button>

          {/* Logo */}
          <img 
            src="/HeySalad Logo Black.png"
            alt="HeySalad" 
            width="64"
            height="64"
            onError={(e) => {
              e.currentTarget.src = "https://heysalad.app/HeySalad%20Logo%20Black.png"
            }}
          />
          <div className="ml-4">
            <span className="title is-4 has-text-weight-bold mb-0 has-text-heysalad-primary font-grandstander">
              Kitchen AI
            </span>
            <div className="is-flex is-align-items-center">
              <span className="tag is-info is-medium mr-2">ADK</span>
              <span className="subtitle is-6 has-text-grey font-figtree">Powered by HeySalad</span>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start ml-6 is-hidden-touch">
          <a className="navbar-item has-text-weight-semibold is-size-5 has-text-grey-dark font-figtree" href="#dashboard">
            Dashboard
          </a>
          <a className="navbar-item has-text-weight-semibold is-size-5 has-text-grey-dark font-figtree" href="#analytics">
            Analytics
          </a>
          <a className="navbar-item has-text-weight-semibold is-size-5 has-text-grey-dark font-figtree" href="#agents">
            AI Agents
          </a>
          <a className="navbar-item has-text-weight-semibold is-size-5 has-text-grey-dark font-figtree" href="#contact">
            Contact
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {/* Voice Command */}
              <button className="button is-heysalad-primary is-medium">
                <span className="icon">
                  <FaMicrophone />
                </span>
                <span className="is-hidden-mobile">Voice</span>
              </button>

              {/* Camera */}
              <button className="button is-heysalad-secondary is-medium">
                <span className="icon">
                  <FaCamera />
                </span>
                <span className="is-hidden-mobile">Camera</span>
              </button>

              {/* Notifications */}
              <button className="button is-light is-medium">
                <span className="icon">
                  <FaBell />
                </span>
                <span className="tag is-danger is-small ml-1">3</span>
              </button>

              {/* Live Status */}
              <div className="tags has-addons">
                <span className="tag is-success is-medium">
                  <span className="status-indicator status-online mr-1"></span>
                </span>
                <span className="tag is-light is-medium has-text-weight-semibold font-figtree">Live</span>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className={`navbar-item has-dropdown ${showUserMenu ? 'is-active' : ''}`}>
            <a 
              className="navbar-link is-size-5"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="icon has-text-heysalad-primary">
                <i className="fas fa-user-circle fa-2x"></i>
              </span>
              <FaChevronDown className="ml-2" />
            </a>
            <div className="navbar-dropdown is-right">
              <div className="navbar-item">
                <div className="content">
                  <p className="is-size-6 has-text-weight-semibold font-figtree">Kitchen Manager</p>
                  <p className="is-size-7 has-text-grey font-figtree">admin@heysalad.com</p>
                </div>
              </div>
              <hr className="navbar-divider" />
              <a className="navbar-item font-figtree">
                <FaCog className="mr-2" />
                Settings
              </a>
              <a className="navbar-item has-text-heysalad-primary font-figtree">
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
EOF

# 5. Update Layout component
echo "🏗️ Updating layout component..."
cat > src/components/layout/Layout.tsx << 'EOF'
import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useSidebar } from '../../hooks/useSidebar'

interface LayoutProps {
  children: ReactNode
  currentDashboard: string
  onDashboardChange: (dashboard: string) => void
}

const Layout: React.FC<LayoutProps> = ({ children, currentDashboard, onDashboardChange }) => {
  const { isCollapsed, isMobile, toggleSidebar, setIsCollapsed } = useSidebar()

  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsCollapsed(true)
    }
  }

  return (
    <div className="is-flex is-flex-direction-column" style={{ minHeight: '100vh' }}>
      <Header onToggleSidebar={toggleSidebar} isSidebarCollapsed={isCollapsed} />
      
      <div className="is-flex is-flex-grow-1">
        <Sidebar 
          currentDashboard={currentDashboard} 
          onDashboardChange={onDashboardChange}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          onClose={handleCloseSidebar}
        />
        
        <main 
          className={`main-content ${!isCollapsed && !isMobile ? 'sidebar-open' : ''}`}
        >
          <div className="container is-fluid">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
EOF

echo ""
echo "🎉 Bulma UI Modernization Complete!"
echo ""
echo "📋 Summary of changes:"
echo "✅ Modern Bulma-based collapsible sidebar"
echo "✅ Responsive design for mobile/desktop"
echo "✅ HeySalad color scheme and branding"
echo "✅ Smooth animations and transitions"
echo "✅ Professional card layouts"
echo "✅ Custom sidebar state management"
echo ""
echo "🚀 Your Kitchen AI interface is now modern and responsive!"
echo ""
echo "📁 Files created/updated:"
echo "   • src/App.css (Bulma + custom styles)"
echo "   • src/hooks/useSidebar.tsx (sidebar state)"
echo "   • src/components/layout/Sidebar.tsx (modern sidebar)"
echo "   • src/components/layout/Header.tsx (modern header)"
echo "   • src/components/layout/Layout.tsx (updated layout)"
echo ""
echo "💾 Backup created in: $BACKUP_DIR"
echo ""
echo "🎯 Next steps:"
echo "   1. Start your dev server: npm start"
echo "   2. Test the collapsible sidebar"
echo "   3. Check responsive design on mobile"
echo "   4. Ready for Phase 2: Backend integration!"