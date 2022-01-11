import React, { useCallback, useRef } from 'react'
import { useTodos } from './useTodos'
import './App.css'

const Heading: React.FunctionComponent<{
  title?: string
  children?: React.ReactNode
}> = ({ title, children }) => <h2>{title ?? children}</h2>

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[]
  render: (item: T) => React.ReactNode
  itemClick?: (item: T) => void
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick?.(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}

const initialTodos = [{ id: 0, text: 'sleeping', done: false }]

function App() {
  const { todos, addTodo, removeTodo } = useTodos(initialTodos)
  const newTodoRef = useRef<HTMLInputElement>(null)
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value)
      newTodoRef.current.value = ''
    }
  }, [addTodo])

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

const JustTodos = () => {
  const { todos } = useTodos(initialTodos)

  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  )
}

const AppWrapper = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
    <App />
    <JustTodos />
  </div>
)

export default AppWrapper
