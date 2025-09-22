import React from 'react'
import { useAppStore } from '../store/useAppStore'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { plugins, activePlugin, setActivePlugin, isCollapsed, setIsCollapsed } = useAppStore()

  const handlePluginClick = (pluginName: string) => {
    if (activePlugin === pluginName) {
      setActivePlugin(null)
    } else {
      setActivePlugin(pluginName)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`no-drag transition-all duration-300 bg-gray-50 border-r border-gray-200 flex flex-col ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-16'
    }`}>
      {/* 折叠按钮 */}
      <div className="p-2 border-b border-gray-200">
        <button
          onClick={toggleCollapse}
          className="w-full h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 插件图标列表 */}
      <div className="flex-1 py-2">
        {plugins.map((plugin) => {
          const IconComponent = plugin.icon
          const isActive = activePlugin === plugin.name
          
          return (
            <div key={plugin.name} className="px-2 mb-2">
              <button
                onClick={() => handlePluginClick(plugin.name)}
                className={`w-full h-12 flex items-center justify-center rounded transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
                title={plugin.displayName}
              >
                <IconComponent className="w-6 h-6" />
              </button>
            </div>
          )
        })}
      </div>

      {/* 设置按钮 */}
      <div className="p-2 border-t border-gray-200">
        <button className="w-full h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Sidebar