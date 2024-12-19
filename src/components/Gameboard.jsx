import '../styles/Gameboard.css'
import Card from './Card'
import { useState, useEffect, useRef } from 'react'

async function fetchPokemon(id) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const imgUrl = data.sprites.front_default;
        return { id, name, imgUrl };
    } catch (error) {
        console.log(error);
        return { id, name: 'Unknown', imgUrl: '' };
    }
}

export default function Gameboard({ increaseScore, resetScore, showScores, currentScore }) {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [gameStart, setGameStart] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [selections, setSelections] = useState([]);
    const [animateCards, setAnimateCards] = useState(false);
    const modalRef = useRef(null);
    const nextLevelRef = useRef(null);
    const winRef = useRef(null);

    const [levelIndex, setLevelIndex] = useState(0);
    const levelOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const levelTwo = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const levelThree = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const levels = [levelOne, levelTwo, levelThree];

    async function loadPokemons(level) {
        const ids = [...level];
        const promises = ids.map((id) => fetchPokemon(id));
        const result = await Promise.all(promises);
        setPokemonArray(result);
    }

    useEffect(() => {
        if (gameStart) {
            loadPokemons(levels[levelIndex]);
            setAnimateCards(true);
            setTimeout(() => setAnimateCards(false), 300);
            setGameStart(false);
        }
    }, [gameStart]);

    useEffect(() => {
        if (gameOver && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [gameOver]);

    useEffect(() => {
        if (currentScore === 36) {
            winRef.current.showModal();
        } else if (currentScore != 0 && currentScore % 12 === 0) {
            nextLevelRef.current.showModal();
        }
    }, [currentScore]);


    function handleClick(id) {
        if (gameOver || selections.includes(id)) {
            console.log('Game Over');
            setGameOver(true);
        } else {
            console.log('new pokemon');
            setSelections([...selections, id]);
            increaseScore();
            shuffleCards(pokemonArray);
        }
    }

    // Fisher-Yates algorithm to shuffle array
    function shuffleCards(prevArray) {
        const newArray = [...prevArray];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
        }
        setPokemonArray(newArray);
        setAnimateCards(true);
        setTimeout(() => setAnimateCards(false), 500);
    }

    function handleRestart() {
        setGameOver(false);
        resetScore();
        setSelections([]);
        setGameStart(true);
        setLevelIndex(0);
        if (modalRef.current) modalRef.current.close();
        if (winRef.current) winRef.current.close();
    }

    function handleNextLevel() {
        setGameStart(true);
        setLevelIndex(levelIndex + 1);
        if (nextLevelRef.current) nextLevelRef.current.close();
    }

    console.log(selections);

    return (
        <>
            <div className='level'>Level {levelIndex + 1}</div>
            <div className='gameboard'>
                <dialog ref={modalRef} className='game-over-dialog'>
                    <h2>Game Over!</h2>
                    {showScores()}
                    <div className='dialog-btns'>
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </dialog>

                <dialog ref={nextLevelRef} className='next-level-dialog'>
                    <h2>Level {levelIndex + 1} Complete!</h2>
                    <div className='dialog-btns'>
                        <button onClick={handleNextLevel}>Next Level</button>
                    </div>
                </dialog>

                <dialog ref={winRef} className='win-dialog'>
                    <h2>Congratulations! You Win!</h2>
                    <div className='dialog-btns'>
                    <button onClick={handleRestart}>Restart</button>
                    </div>
                </dialog>

                {pokemonArray.map((pokemon) => (
                    <Card
                        key={pokemon.id}
                        name={pokemon.name}
                        imgUrl={pokemon.imgUrl}
                        onClick={() => handleClick(pokemon.id)}
                        animate={animateCards}
                    />
                ))}
            </div>
            {gameOver && <button className='restart-btn' onClick={handleRestart}>Reset</button>}
        </>
    )
}