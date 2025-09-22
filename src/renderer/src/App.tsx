import React, { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import WindowFrame from './components/WindowFrame'
import { loadAllPlugins } from './plugins'

function App() {
  const {
    setPlugins,
    setPluginMetadata,
    setIsPluginsLoaded,
    loadSettings,
    isCollapsed
  } = useAppStore()

  useEffect(() => {
    // 初始化应用
    const initializeApp = async () => {
      try {
        // 加载设置
        await loadSettings()
        
        // 加载插件元数据
        if (window.electronAPI) {
          const metadata = await window.electronAPI.getPlugins()
          setPluginMetadata(metadata)
        }
        
        // 加载实际插件组件
        const plugins = await loadAllPlugins()
        setPlugins(plugins)
        setIsPluginsLoaded(true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initializeApp()
  }, [setPlugins, setPluginMetadata, setIsPluginsLoaded, loadSettings])

  return (
    <div className="w-full h-full bg-white border border-gray-300 shadow-xl overflow-hidden">
      <WindowFrame />
      <div className="flex h-full">
        {!isCollapsed && <Sidebar />}
        <div className="flex-1">
          <MainContent />
        </div>
      </div>
    </div>
  )
}

export default App