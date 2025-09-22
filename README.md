# Omni Float Desktop

一个可扩展的桌面悬浮窗助手，具有模块化插件系统。

## 功能特性

- **悬浮窗模式**: 无边框、透明背景、始终置顶的桌面助手
- **模块化插件系统**: 支持动态加载和管理插件
- **数据持久化**: 自动保存应用设置和插件数据
- **现代化UI**: 基于 React + Tailwind CSS 的精美界面

## 技术栈

- **应用框架**: Electron
- **构建工具**: Vite + electron-vite
- **前端框架**: React + TypeScript
- **UI样式**: Tailwind CSS
- **状态管理**: Zustand
- **数据存储**: electron-store

## 快速开始

### 环境要求

- Node.js >= 18.18.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

> **注意**: 第一次运行前请确保所有依赖都已正确安装。如果遇到 TypeScript 编译错误，这是正常的，因为依赖尚未安装。运行 `npm install` 后这些错误会消失。

### 故障排除

如果遇到以下错误：

1. **"Dynamic require of tailwindcss is not supported"**
   - 确保 `postcss.config.js` 文件存在且格式正确
   - 如果问题持续，尝试删除 `node_modules` 和 `package-lock.json`，然后重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript 编译错误**
   - 确保已安装所有依赖：`npm install`
   - 检查 Node.js 版本是否 >= 18.18.0

3. **Electron 启动失败**
   - 确保没有其他 Electron 应用正在运行
   - 尝试清理缓存：`npm run build` 然后 `npm run dev`

### 构建应用

```bash
# 构建 Windows 应用
npm run build:win

# 构建 macOS 应用
npm run build:mac

# 构建 Linux 应用
npm run build:linux
```

## 项目结构

```
omni-float-desktop/
├── src/
│   ├── main/                 # 主进程代码
│   │   ├── index.ts          # 主进程入口
│   │   └── plugins.ts        # 插件加载器
│   ├── preload/              # 预加载脚本
│   │   └── index.ts          # Context Bridge API
│   ├── renderer/             # 渲染进程代码
│   │   ├── src/
│   │   │   ├── App.tsx       # 主应用组件
│   │   │   ├── components/   # 共享UI组件
│   │   │   ├── store/        # Zustand 状态管理
│   │   │   └── plugins/      # 插件目录
│   │   │       ├── ai-chat/  # AI聊天插件
│   │   │       └── todo-list/ # 待办事项插件
│   └── shared/               # 共享类型定义
│       └── types/
│           └── plugin-api.ts # 插件接口
├── package.json
├── electron.vite.config.ts
└── tsconfig.json
```

## 插件开发

### 插件接口

所有插件必须实现 `Plugin` 接口：

```typescript
interface Plugin {
  name: string                // 唯一标识符
  displayName: string         // UI显示名称
  icon: React.ComponentType   // 插件图标组件
  render: () => React.ReactElement // 插件主界面
}
```

### 创建新插件

1. 在 `src/renderer/src/plugins/` 目录下创建新文件夹
2. 创建以下文件：
   - `index.tsx` - 插件定义
   - `icon.tsx` - 插件图标组件
   - `YourPluginView.tsx` - 插件主界面组件

3. 在 `src/renderer/src/plugins/index.ts` 中注册新插件

### 示例插件

项目包含两个示例插件：

- **AI 助手** (`ai-chat`): 智能聊天界面
- **待办事项** (`todo-list`): 任务管理工具

## 开机自启

应用支持开机自启功能（需在打包后的应用中配置）。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！