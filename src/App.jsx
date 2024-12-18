import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Scoreboard from './components/Scoreboard'
import Gameboard from './components/Gameboard'

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [start, setStart] = useState(false);

  function increaseScore() {
    // react state updates are asynchronous
    // use functional update to ensure the most recent value of currentScore
    setCurrentScore((prevScore) => {
      const newScore = prevScore + 1;
      setBestScore((prevBest) => (newScore > prevBest ? newScore : prevBest));
      return newScore;
    });
  }

  function updateScores() {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
  }

  function startGame() {
    setStart(true);
  }

  if (!start) {
    return (
      <>
        <Header />
        <button className='start' onClick={startGame}>Start Game</button>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <Scoreboard bestScore={bestScore} currentScore={currentScore} />
        <Gameboard increaseScore={increaseScore} updateScores={updateScores}/>
      </>
    )
  }
}

export default App
