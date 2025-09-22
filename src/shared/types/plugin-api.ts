import React from 'react'

export interface Plugin {
  name: string // 唯一标识符, e.g., "ai-chat"
  displayName: string // UI显示名称, e.g., "AI 助手"
  icon: React.ComponentType<{ className?: string }> // 插件图标 (一个React组件)
  render: () => React.ReactElement // 插件的主界面 (一个React组件)
}

export interface PluginMetadata {
  name: string
  displayName: string
  description?: string
  version?: string
}

export interface ElectronAPI {
  getPlugins: () => Promise<PluginMetadata[]>
  saveAppSettings: (settings: any) => Promise<void>
  loadAppSettings: () => Promise<any>
  // 窗口控制API
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
  // 窗口状态监听
  onWindowStateChanged: (callback: (state: { isMaximized: boolean }) => void) => void
  onPluginsLoaded: (callback: (plugins: PluginMetadata[]) => void) => void
  removeAllListeners: (channel: string) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}