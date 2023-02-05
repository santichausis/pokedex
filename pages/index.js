import Image from 'next/image'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Filter from './components/Filters';
import Link from 'next/link'

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const { results } = await res.json();
        const pokemonData = await Promise.all(results.map(async pokemon => {
          const pokemonRes = await fetch(pokemon.url);
          const pokemonInfo = await pokemonRes.json();
          const { name } = pokemon;
          const number = pokemon.id;
          const types = pokemonInfo.types.map(type => type.type.name).join(' ');
          return { name: name, types };
        }));
        setPokemonList(pokemonData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="A Pokedex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1 className='title'>Pokemon List</h1>
      <Filter onFilterChange={setFilter} />
      <ul className='pokemon-list'>
        {pokemonList
          .filter(p => !filter || p.types.includes(filter))
          .map((pokemon, index) => (
            <li key={index} className='pokemonCard'>
              <Link href="/pokemon/[name]" as={`/pokemon/${pokemon.name}`}>
                <div className='imgContainer'>
                  <Image src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`This is ${pokemon.name}`} className='imgDetail' width={200} height={150} />
                </div>
                <div>
                  <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                  <p>{pokemon.types.charAt().toUpperCase() + pokemon.types.slice(1)}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
