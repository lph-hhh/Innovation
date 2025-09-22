import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

interface WindowFrameProps {}

const WindowFrame: React.FC<WindowFrameProps> = () => {
  const { isCollapsed, setIsCollapsed } = useAppStore()
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // 监听窗口状态变化
    if (window.electronAPI?.onWindowStateChanged) {
      window.electronAPI.onWindowStateChanged((state) => {
        setIsMaximized(state.isMaximized)
      })
    }

    return () => {
      if (window.electronAPI?.removeAllListeners) {
        window.electronAPI.removeAllListeners('window-state-changed')
      }
    }
  }, [])

  const handleClose = () => {
    window.close()
  }

  const handleMinimize = () => {
    if (window.electronAPI?.minimize) {
      window.electronAPI.minimize()
    }
  }

  const handleMaximize = () => {
    if (window.electronAPI?.maximize) {
      window.electronAPI.maximize()
    }
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="drag flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-700 px-3">
      <div className="flex items-center space-x-2">
        <button 
          className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/20 rounded no-drag transition-colors" 
          onClick={toggleSidebar}
          title={isCollapsed ? "显示侧边栏" : "隐藏侧边栏"}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="text-xs text-white font-medium">📌 Omni Float Desktop</div>
      </div>
      <div className="flex items-center space-x-1">
        <button 
          className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/20 rounded no-drag transition-colors" 
          onClick={handleMinimize}
          title="最小化"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/20 rounded no-drag transition-colors" 
          onClick={handleMaximize}
          title={isMaximized ? "还原" : "最大化"}
        >
          {isMaximized ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 4a2 2 0 00-2 2v2a1 1 0 102 0V6h2a1 1 0 100-2H6zm6 0a1 1 0 100 2h2v2a1 1 0 102 0V6a2 2 0 00-2-2h-2zm-6 8a1 1 0 10-2 0v2a2 2 0 002 2h2a1 1 0 100-2H6v-2zm8 0a1 1 0 012 0v2a2 2 0 01-2 2h-2a1 1 0 110-2h2v-2z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 110 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <button 
          className="w-6 h-6 flex items-center justify-center text-white hover:bg-red-500 rounded no-drag transition-colors" 
          onClick={handleClose}
          title="关闭"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WindowFrame