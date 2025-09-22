import { create } from 'zustand'
import { Plugin, PluginMetadata } from '@shared/types/plugin-api'

interface AppState {
  // 插件相关状态
  plugins: Plugin[]
  pluginMetadata: PluginMetadata[]
  activePlugin: string | null
  isPluginsLoaded: boolean
  
  // UI 状态
  isCollapsed: boolean
  isDragging: boolean
  
  // 应用设置
  settings: {
    autoStart: boolean
    theme: 'light' | 'dark' | 'auto'
    position: { x: number; y: number }
    size: { width: number; height: number }
  }
  
  // Actions
  setPlugins: (plugins: Plugin[]) => void
  setPluginMetadata: (metadata: PluginMetadata[]) => void
  setActivePlugin: (pluginName: string | null) => void
  setIsPluginsLoaded: (loaded: boolean) => void
  setIsCollapsed: (collapsed: boolean) => void
  setIsDragging: (dragging: boolean) => void
  updateSettings: (settings: Partial<AppState['settings']>) => void
  loadSettings: () => Promise<void>
  saveSettings: () => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  plugins: [],
  pluginMetadata: [],
  activePlugin: null,
  isPluginsLoaded: false,
  isCollapsed: false,
  isDragging: false,
  settings: {
    autoStart: false,
    theme: 'auto',
    position: { x: 100, y: 100 },
    size: { width: 400, height: 600 }
  },
  
  // Actions
  setPlugins: (plugins) => set({ plugins }),
  
  setPluginMetadata: (metadata) => set({ pluginMetadata: metadata }),
  
  setActivePlugin: (pluginName) => set({ activePlugin: pluginName }),
  
  setIsPluginsLoaded: (loaded) => set({ isPluginsLoaded: loaded }),
  
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),
  
  loadSettings: async () => {
    try {
      if (window.electronAPI) {
        const savedSettings = await window.electronAPI.loadAppSettings()
        if (savedSettings && Object.keys(savedSettings).length > 0) {
          set((state) => ({
            settings: { ...state.settings, ...savedSettings }
          }))
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  },
  
  saveSettings: async () => {
    try {
      if (window.electronAPI) {
        const { settings } = get()
        await window.electronAPI.saveAppSettings(settings)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }
}))