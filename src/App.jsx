import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import Gameboard from './components/Gameboard'

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  function increaseScore() {
    setCurrentScore(currentScore + 1);
  }

  return (
    <>
      <Header />
      <Scoreboard bestScore={bestScore} currentScore={currentScore} />
      <Gameboard increaseScore={increaseScore} />
    </>
  )
}

export default App
