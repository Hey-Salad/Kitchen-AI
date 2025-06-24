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
