import React from 'react'
import { Plugin } from '@shared/types/plugin-api'
import TodoIcon from './icon'
import TodoListView from './TodoListView'

const todoListPlugin: Plugin = {
  name: 'todo-list',
  displayName: '待办事项',
  icon: TodoIcon,
  render: () => <TodoListView />
}

export default todoListPlugin