import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { loadPlugins } from './plugins'

// 应用程序存储将在异步初始化
let store: any = null

async function initializeStore() {
  const { default: Store } = await import('electron-store')
  store = new Store()
  return store
}

function createWindow(): void {
  // 创建主窗口 - 悬浮窗设计
  const mainWindow = new BrowserWindow({
    width: 380,
    height: 580,
    minWidth: 320,
    minHeight: 400,
    show: false,
    autoHideMenuBar: true,
    frame: false, // 无边框
    transparent: true, // 透明背景
    alwaysOnTop: true, // 总是在最上层
    resizable: true,
    skipTaskbar: false, // 允许在任务栏显示（最大化时需要）
    movable: true, // 可移动
    minimizable: true, // 允许最小化
    maximizable: true, // 允许最大化
    closable: true, // 允许关闭
    focusable: true, // 可获得焦点
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // 设置窗口位置到屏幕右上角
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
  
  // 定位到右上角，留一些边距
  mainWindow.setPosition(screenWidth - 400, 20)

  // 窗口准备显示时显示窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus() // 确保窗口获得焦点
  })

  // 处理外部链接
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 开发环境下加载本地服务器，生产环境下加载文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 保持窗口在最上层
  mainWindow.setAlwaysOnTop(true, 'floating')
  
  // 当窗口失去焦点时，保持在最上层但降低透明度
  mainWindow.on('blur', () => {
    mainWindow.setOpacity(0.8)
  })
  
  // 当窗口获得焦点时，恢复完全不透明
  mainWindow.on('focus', () => {
    mainWindow.setOpacity(1.0)
  })
}

// 应用程序准备就绪时创建窗口
app.whenReady().then(async () => {
  // 初始化存储
  await initializeStore()

  // 设置应用程序用户模型ID (Windows)
  electronApp.setAppUserModelId('com.example.omni-float-desktop')

  // 开发环境下默认打开或关闭DevTools
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC处理程序
  ipcMain.handle('get-plugins', async () => {
    try {
      const plugins = await loadPlugins()
      return plugins
    } catch (error) {
      console.error('Failed to load plugins:', error)
      return []
    }
  })

  // 窗口控制IPC处理程序
  ipcMain.handle('window-minimize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      window.minimize()
    }
  })

  ipcMain.handle('window-maximize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize()
        // 还原时恢复悬浮窗属性
        window.setAlwaysOnTop(true, 'floating')
        window.setSkipTaskbar(true)
      } else {
        window.maximize()
        // 最大化时调整属性
        window.setAlwaysOnTop(false)
        window.setSkipTaskbar(false)
      }
      // 发送状态更新
      window.webContents.send('window-state-changed', {
        isMaximized: window.isMaximized()
      })
    }
  })

  ipcMain.handle('window-close', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      window.close()
    }
  })

  ipcMain.handle('save-app-settings', async (_, settings) => {
    try {
      if (!store) {
        throw new Error('Store not initialized')
      }
      store.set('appSettings', settings)
      return { success: true }
    } catch (error) {
      console.error('Failed to save settings:', error)
      return { success: false, error: String(error) }
    }
  })

  ipcMain.handle('load-app-settings', async () => {
    try {
      if (!store) {
        throw new Error('Store not initialized')
      }
      return store.get('appSettings', {})
    } catch (error) {
      console.error('Failed to load settings:', error)
      return {}
    }
  })

  createWindow()

  app.on('activate', function () {
    // macOS上，当点击dock图标且没有其他窗口打开时，重新创建窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口关闭时退出应用程序，macOS除外
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在此文件中，您可以包含应用程序特定的主进程代码
// 您也可以将它们放在单独的文件中并在此处require它们