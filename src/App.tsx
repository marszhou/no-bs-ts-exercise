import React, { useCallback, useRef } from 'react'
import { useTodos } from './useTodos'
import './App.css'
import { render } from '@testing-library/react'

const Heading: React.FunctionComponent<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => <h2>{title ?? children}</h2>

function UL<T>({
  items,
  render,
  itemClick
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[]
  render: (item: T) => React.ReactNode,
  itemClick?: (item: T) => void
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick?.(item)}>{render(item)}</li>
      ))}
    </ul>
  )
}

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: 'sleeping', done: false },
  ])
  const newTodoRef = useRef<HTMLInputElement>(null)
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value)
      newTodoRef.current.value = ''
    }
  }, [])

  return (
    <div>
      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>remove</button>
          </>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>add</button>
      </div>
    </div>
  )
}

export default App
