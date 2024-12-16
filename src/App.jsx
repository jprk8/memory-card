import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import Gameboard from './components/Gameboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Scoreboard />
      <Gameboard />
    </>
  )
}

export default App
