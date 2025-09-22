import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 定义自定义 API
const api = {
  getPlugins: () => ipcRenderer.invoke('get-plugins'),
  saveAppSettings: (settings: any) => ipcRenderer.invoke('save-app-settings', settings),
  loadAppSettings: () => ipcRenderer.invoke('load-app-settings'),
  // 窗口控制API
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  // 窗口状态监听
  onWindowStateChanged: (callback: (state: { isMaximized: boolean }) => void) => {
    ipcRenderer.on('window-state-changed', (_, state) => callback(state))
  },
  onPluginsLoaded: (callback: (plugins: any[]) => void) => {
    ipcRenderer.on('plugins-loaded', (_, plugins) => callback(plugins))
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  }
}

// 使用 `contextBridge` API 来暴露 Electron API 给渲染进程
// 尽量只暴露在渲染进程中需要的 API，而不是整个 Node.js 模块
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('electronAPI', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (兼容性代码)
  window.electron = electronAPI
  // @ts-ignore
  window.electronAPI = api
}