import React, {
  useCallback,
  useRef,
} from 'react'
import {useTodos} from './useTodos'
import './App.css'

const Heading: React.FunctionComponent<{ title: string }> = ({ title }) => (
  <h2>{title}</h2>
)

function App() {
  const {todos, addTodo, removeTodo} = useTodos([{id: 0, text: 'sleeping', done: false}])
  const newTodoRef = useRef<HTMLInputElement>(null)
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value )
      newTodoRef.current.value = ''
    }
  }, [])


  return (
    <div>
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>
            remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>add</button>
      </div>
    </div>
  )
}

export default App
