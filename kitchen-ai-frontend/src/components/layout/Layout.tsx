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
      {/* Header without props since we removed them */}
      <Header />
      
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