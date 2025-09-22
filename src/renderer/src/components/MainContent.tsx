import React from 'react'
import { useAppStore } from '../store/useAppStore'

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = () => {
  const { plugins, activePlugin, isPluginsLoaded, setActivePlugin, isCollapsed, setIsCollapsed } = useAppStore()

  // 查找当前激活的插件
  const currentPlugin = plugins.find(p => p.name === activePlugin)

  if (!isPluginsLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plugins...</p>
        </div>
      </div>
    )
  }

  if (!activePlugin || !currentPlugin) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Omni Float</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Select a plugin to get started. This floating assistant helps you stay productive with quick access to various tools and utilities.
          </p>
          
          {/* 快速访问按钮 */}
          {plugins.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-3">Quick access:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {plugins.map((plugin) => {
                  const IconComponent = plugin.icon
                  return (
                    <button
                      key={plugin.name}
                      onClick={() => setActivePlugin(plugin.name)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm">{plugin.displayName}</span>
                    </button>
                  )
                })}
              </div>
              {isCollapsed && (
                <div className="mt-4">
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Show Sidebar</span>
                  </button>
                </div>
              )}
            </div>
          )}
          
          {plugins.length === 0 && (
            <p className="text-sm text-orange-600 mt-4">
              No plugins available. Make sure plugins are properly loaded.
            </p>
          )}
        </div>
      </div>
    )
  }

  // 渲染当前激活的插件
  return (
    <div className="flex-1 flex flex-col">
      {/* 插件标题栏 */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50">
        <h3 className="font-medium text-gray-800">{currentPlugin.displayName}</h3>
        <button
          onClick={() => useAppStore.getState().setActivePlugin(null)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* 插件内容区域 */}
      <div className="flex-1 overflow-hidden">
        {currentPlugin.render()}
      </div>
    </div>
  )
}

export default MainContent