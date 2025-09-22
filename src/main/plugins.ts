import { readdir } from 'fs/promises'
import { join } from 'path'
import { PluginMetadata } from '../shared/types/plugin-api'

export async function loadPlugins(): Promise<PluginMetadata[]> {
  const plugins: PluginMetadata[] = []
  
  try {
    // 在生产环境中，我们需要预定义插件列表
    // 因为动态导入在打包后的环境中工作方式不同
    const pluginList = [
      {
        name: 'ai-chat',
        displayName: 'AI 助手',
        description: '智能聊天助手',
        version: '1.0.0'
      },
      {
        name: 'todo-list',
        displayName: '待办事项',
        description: '任务管理工具',
        version: '1.0.0'
      }
    ]

    return pluginList
  } catch (error) {
    console.error('Error loading plugins:', error)
    return []
  }
}

// 开发环境下的动态插件加载（可选）
export async function loadPluginsDynamically(): Promise<PluginMetadata[]> {
  const plugins: PluginMetadata[] = []
  
  try {
    const pluginsPath = join(__dirname, '../renderer/src/plugins')
    const pluginDirs = await readdir(pluginsPath, { withFileTypes: true })
    
    for (const dir of pluginDirs) {
      if (dir.isDirectory()) {
        try {
          const pluginIndexPath = join(pluginsPath, dir.name, 'index.js')
          // 注意：在主进程中不能直接导入渲染进程的模块
          // 这里只返回元数据，实际的插件组件在渲染进程中加载
          plugins.push({
            name: dir.name,
            displayName: dir.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `${dir.name} plugin`,
            version: '1.0.0'
          })
        } catch (error) {
          console.warn(`Failed to load plugin ${dir.name}:`, error)
        }
      }
    }
  } catch (error) {
    console.error('Error loading plugins dynamically:', error)
  }
  
  return plugins
}