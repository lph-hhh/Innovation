import React from 'react'
import { Plugin } from '@shared/types/plugin-api'
import AiChatIcon from './icon'
import AiChatView from './AiChatView'

const aiChatPlugin: Plugin = {
  name: 'ai-chat',
  displayName: 'AI 助手',
  icon: AiChatIcon,
  render: () => <AiChatView />
}

export default aiChatPlugin