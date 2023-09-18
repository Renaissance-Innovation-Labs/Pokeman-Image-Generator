import React, { useState } from 'react';
import axios from 'axios';
import PokemonModal from './components/PokemonModal';

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pokemonName.trim()) {
      alert('Please insert a Pokémon name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Pokémon not found. Please try another name.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex justify-center flex-col items-center  '>
      <div className='bg-[rgb(208,168,176)] w-full text-center h-36 grid text-white'>
      <h1 className='mb-4 pt-6 text-4xl'>Poké Search App</h1>
      <form onSubmit={handleSubmit} className='flex justify-center items-center gap-4 '>
        <input
          type="text"
          placeholder="Enter Pokémon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          className='bg-inherit w-60 h-8 outline-0 border border-zinc-950 outline-transparent rounded-md p-2 text-xl'
        />
        <button type="submit" className='border border-zinc-950 rounded-md px-2 text-xl h-8 hover:bg-[rgba(34,105,171,0.9)]'>Search</button>
      </form>
      </div>
      <div className=''>
      {loading ? (
        <img src="/chicken.gif" alt="Loading" />
      ) : error ? (
        <p className="text-red-600 pt-48 text-3xl">{error}</p>
      ) : (
        pokemonData && (
          <div className='text-2xl'>
             <h2 className='font-bold text-center p-4'>{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonName}
              onClick={() => setShowModal(true)}
              className="cursor-pointer w-48"
            />
            <p className='pb-2'><span className='font-bold'>Base Stats: </span>{pokemonData.base_experience}</p>
        
            <ul>
            {pokemonData.stats.map((stat, index) => (
         <li key={index} className='pb-2'><span className='font-bold'>{pokemonData.stats[index].stat.name}:</span> {pokemonData.stats[index].base_stat}</li>
        ))}
                 <button onClick={() => setShowModal(true)} className='-4 bg-[rgb(123,123,148)] text-white px-4 py-2 rounded hover:bg-[rgba(123,123,148,0.4)] '>show More</button>
            </ul>
            {showModal && (
              <PokemonModal pokemonData={pokemonData} closeModal={closeModal} />
            )}
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default Pokemon;

