import React from "react";

const PokemonModal = ({ pokemonData, closeModal }) => {
return (
    <div className="fixed inset-0 z-50 bg-[rgb(208,168,176)] ">
    <div className="modal-container flex">
        <div className="modal bg-[rgb(248,232,248)] absolute top-1/2 left-1/2 tr p-4 rounded-lg shadow-2xl w-64 flex flex-col">
        <h2 className="text-xl font-semibold text-center">{pokemonData.name}</h2>
        <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            
            />
        <div className="mb-4">
            <h3 className="text-lg font-medium">Abilities:</h3>
            <ul>
            {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
            ))}
            </ul>
        </div>
        <div className="mb-4">
            <h3 className="text-lg font-medium">Moves:</h3>
            <ul>
            {pokemonData.moves.slice(0, 5).map((move, index) => (
                <li key={index}>{move.move.name}</li>
            ))}
            </ul>
        </div>
        <div>
            <h3 className="text-lg font-medium">Types:</h3>
            <ul>
            {pokemonData.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
            ))}
            </ul>
        </div>
        <button
            className="mt-4 bg-[rgb(123,123,148)] text-white px-4 py-2 rounded hover:bg-[rgba(123,123,148,0.4)] "
            onClick={closeModal}
        >
            Close
        </button>
        </div>
    </div>
    </div>
);
};

export default PokemonModal;
