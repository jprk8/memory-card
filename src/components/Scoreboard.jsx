import '../styles/Scoreboard.css'

export default function Scoreboard({ bestScore, currentScore }) {
    return (
        <div className='scoreboard'>
            <div className='best-score'>
                Best Score: {bestScore}
            </div>
            <div className='current-score'>
                Current Score: {currentScore}
            </div>
        </div>
    )
}