import { useCallback, useEffect } from 'react'
import { createGlobalState } from 'react-use'

interface Todo {
  id: number
  done: boolean
  text: string
}

const useGlobalTodos = createGlobalState<Todo[]>([])

const useTodos = (
  initialState: Todo[]
): {
  todos: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: number) => void
} => {
  const [todos, setTodos] = useGlobalTodos()

  useEffect(() => {
    setTodos(initialState)
  }, [initialState, setTodos])

  const addTodo = useCallback(
    (text: string) => {
      setTodos([
        ...todos,
        {
          id: todos.length,
          text,
          done: false,
        },
      ])
    },
    [todos, setTodos]
  )
  const removeTodo = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id))
    },
    [todos, setTodos]
  )

  return { todos, addTodo, removeTodo }
}

export { useTodos }
