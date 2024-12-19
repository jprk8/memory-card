import '../styles/Gameboard.css'
import Card from './Card'
import Scoreboard from './Scoreboard'
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

export default function Gameboard({ increaseScore, resetScore, showScores }) {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameStart, setGameStart] = useState(true);
    const [selections, setSelections] = useState([]);
    const [animateCards, setAnimateCards] = useState(false);
    const modalRef = useRef(null); // reference to dialog element

    async function loadPokemons() {
        const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const promises = ids.map((id) => fetchPokemon(id));
        const result = await Promise.all(promises);
        setPokemonArray(result);
    }

    // set gameStart to false after start so it doesn't recall initGAme

    // without using useEffect
    if (gameStart) {
        loadPokemons();
        setAnimateCards(true);
        setTimeout(() => setAnimateCards(false), 300);
        setGameStart(false);
    }

    if (gameOver && modalRef.current) {
        modalRef.current.showModal();
    }

    function handleClick(id) {
        if (gameOver || selections.includes(id)) {
            console.log('Game Over');
            setGameOver(true); // game over
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
        if (modalRef.current) modalRef.current.close();
    }

    console.log(selections);

    return (
        <>
            <div className='gameboard'>
                <dialog ref={modalRef} className='game-over-dialog'>
                    <h2>Game Over!</h2>
                    {showScores()}
                    <div className='dialog-btns'>
                        <button onClick={handleRestart}>Restart</button>
                        <button onClick={() => modalRef.current.close()}>Close</button>
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