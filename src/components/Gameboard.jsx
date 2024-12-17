import '../styles/Gameboard.css'
import Card from './Card'
import { useState, useEffect } from 'react';

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
        return { id, name: 'Unknown', imgUrl: '' }; //fallback values
    }
}

export default function Gameboard({ increaseScore }) {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [selections, setSelections] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const promises = ids.map((id) => fetchPokemon(id));
            const result = await Promise.all(promises);
            setPokemonArray(result);
        }
        loadPokemons();
    }, [gameOver]);

    function handleClick(id) {
        if (selections.includes(id)) {
            console.log('already chosen');
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
    }

    console.log(selections);

    return (
        <div className='gameboard'>
            {pokemonArray.map((pokemon) => (
                <Card
                    key={pokemon.id}
                    name={pokemon.name}
                    imgUrl={pokemon.imgUrl}
                    onClick={() => handleClick(pokemon.id)}
                />
            ))}
        </div>
    )
}