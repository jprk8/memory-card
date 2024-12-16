import '../styles/Gameboard.css'
import Card from './Card'
import { useState, useEffect } from 'react';

async function fetchPokemon(id) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const imgUrl = data.sprites.front_default;
        console.log(name);
        console.log(imgUrl);
        return { id, name, imgUrl };
    } catch (error) {
        console.log(error);
        return { id, name: 'Unknown', imgUrl: '' }; //fallback values
    }
}

export default function Gameboard() {
    const [pokemonArray, setPokemonArray] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const promises = ids.map((id) => fetchPokemon(id));
            const result = await Promise.all(promises);
            setPokemonArray(result);
        }
        loadPokemons();
    }, []);

    return (
        <div className='gameboard'>
            {pokemonArray.map((pokemon) => (
                <Card key={pokemon.id} name={pokemon.name} imgUrl={pokemon.imgUrl} />
            ))}
        </div>
    )
}