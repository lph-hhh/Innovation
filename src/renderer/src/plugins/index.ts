import { Plugin } from '@shared/types/plugin-api'

// 插件加载器
export async function loadAllPlugins(): Promise<Plugin[]> {
  const plugins: Plugin[] = []
  
  try {
    // 动态导入 ai-chat 插件
    const aiChatModule = await import('./ai-chat/index')
    if (aiChatModule.default) {
      plugins.push(aiChatModule.default)
    }
    
    // 动态导入 todo-list 插件
    const todoListModule = await import('./todo-list/index')
    if (todoListModule.default) {
      plugins.push(todoListModule.default)
    }
  } catch (error) {
    console.error('Error loading plugins:', error)
  }
  
  return plugins
}

// 根据名称获取单个插件
export async function getPlugin(name: string): Promise<Plugin | null> {
  try {
    // 使用显式的文件路径而不是动态构造
    switch (name) {
      case 'ai-chat':
        const aiChatModule = await import(/* @vite-ignore */ `./ai-chat/index`)
        return aiChatModule.default || null
      case 'todo-list':
        const todoListModule = await import(/* @vite-ignore */ `./todo-list/index`)
        return todoListModule.default || null
      default:
        console.warn(`Unknown plugin: ${name}`)
        return null
    }
  } catch (error) {
    console.error(`Error loading plugin ${name}:`, error)
    return null
  }
}