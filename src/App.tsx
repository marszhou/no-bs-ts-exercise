import React, { useCallback, useRef, useState } from 'react'
import { useTodos, useAddTodo, useRemoveTodo, TodosProvider } from './useTodos'
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

function App() {
  const todos = useTodos()
  const addTodo = useAddTodo()
  const removeTodo = useRemoveTodo()

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

const AppWrapper = () => {
  const [a, setA] = useState(1)

  return (
    <TodosProvider
      initialTodos={[{ id: 0, text: 'sleeping by Context', done: false }]}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
        }}
      >
        <App />
        <App />
      </div>
      <button onClick={() => setA(a+1)}>add {a}</button>
    </TodosProvider>
  )
}

export default AppWrapper
