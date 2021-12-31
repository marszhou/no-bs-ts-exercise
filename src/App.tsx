import React, { useCallback } from 'react'
import './App.css'

const Heading: React.FunctionComponent<{ title: string }> = ({ title }) => (
  <h2>{title}</h2>
)
const Box: React.FunctionComponent = ({ children }) => {
  return <div style={{ padding: '1rem', fontWeight: 'bold' }}>{children}</div>
}

const List : React.FunctionComponent<{items: string[], onClick?: (item: string)=> void}> =  ({items, onClick}) => (
  <ul>
    {items.map((item, index) => (<li key={index} onClick={() => onClick?.(item)}>{item}</li>))}
  </ul>
)

function App() {
  const onListClick = useCallback((item: string) => alert(item), [])
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello There!</Box>
      <List items={['1','2','3']} onClick={onListClick}/>
    </div>
  )
}

export default App
