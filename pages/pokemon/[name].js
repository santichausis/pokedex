import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

const Pokemon = () => {
    const router = useRouter();
    const { name } = router.query;
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            setPokemon(data);
        }
        fetchData();
    }, [name]);

    return (
        <>
            <Head>
                <title>{`#${pokemon.id} | ${pokemon.name}`}</title>
                <meta name="description" content={`A description of ${pokemon.name}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Link className='backLink' href="/">Back</Link>
            <div className='mainContainerDetail'>
                <Image src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`This is ${pokemon.name}`} className='imgDetail' width={200} height={150} />
                <div className='statsPokemon'>
                <h1>{pokemon.name}</h1>
                <p>Number: {pokemon.id}</p>
                <p>Height: {`${pokemon.height} kg`}</p>
                </div>
            </div>
        </>
    );
};

export default Pokemon;