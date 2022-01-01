import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import './App.css'

const Heading: React.FunctionComponent<{ title: string }> = ({ title }) => (
  <h2>{title}</h2>
)
const Box: React.FunctionComponent = ({ children }) => {
  return <div style={{ padding: '1rem', fontWeight: 'bold' }}>{children}</div>
}

const List: React.FunctionComponent<{
  items: string[]
  onClick?: (item: string) => void
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
)

interface Payload {
  text: string
}
interface Todo {
  id: number
  done: boolean
  text: string
}

type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

const useNumber = (initial: number) => useState(initial)
type NumberType = ReturnType<typeof useNumber>[0]
type SetNumberType = ReturnType<typeof useNumber>[1]

const Incrementer: React.FunctionComponent<{
  number: NumberType
  setNumber: SetNumberType
}> = ({ number, setNumber }) => (
  <Button
    title={`add - ${number}`}
    onClick={() => setNumber(number + 1)}
  ></Button>
)

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title: string }
> = ({ children, style, title, ...rest }) => (
  <button
    style={{
      fontSize: 'xx-large',
      backgroundColor: 'red',
      color: 'white',
    }}
    {...rest}
  >
    {title ?? children}
  </button>
)

function App() {
  const onListClick = useCallback((item: string) => alert(item), [])

  const [payload, setPayload] = useState<Payload | null>(null)

  useEffect(() => {
    fetch('./data.json')
      .then((resp) => resp.json())
      .then((data) => setPayload(data))
  }, [])

  const [todos, dispatch] = useReducer(
    (state: Todo[], action: ActionType): Todo[] => {
      switch (action.type) {
        case 'ADD':
          return [
            ...state,
            {
              id: state.length,
              text: action.text,
              done: false,
            },
          ]
        case 'REMOVE':
          return state.filter(({ id }) => id! !== action.id)
        default:
          return state
      }
    },
    []
  )

  const newTodoRef = useRef<HTMLInputElement>(null)
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: 'ADD', text: newTodoRef.current.value })
      newTodoRef.current.value = ''
    }
  }, [])

  const [number, setNumber] = useNumber(10)

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello There!</Box>
      <List items={['1', '2', '3']} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer number={number} setNumber={setNumber} />
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}>
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
