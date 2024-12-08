import React, { useState } from 'react';
import Results from './components/Results';
import SearchForm from './components/SearchForm';


const App = () => {
    const [places, setPlaces] = useState([]); // Stocke les résultats de la recherche
    const [isSelected, setIsSelected] = useState(false); // Indique si un lieu est choisie

    /**
     * Called when the search form is submitted.
     * Updates the places state with the new search results,
     * and resets the isSelected state to false.
     * @param {Array} newPlaces - The new search results.
     */
    const handleSearch = (newPlaces) => {
        setPlaces(newPlaces);
        setIsSelected(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-center text-4xl font-bold text-indigo-700 mb-8">
                Nearby Montpellier
            </h1>
            <h2 className="text-center text-2xl font-bold text-red-700 mb-8" >
                Sortir à Montpellier et ses alentours
            </h2>

            <SearchForm onResults={handleSearch} setIsSelected={setIsSelected} />


            <Results places={places} isSelected={isSelected} setIsSelected={setIsSelected} />

        </div>
    );
};

export default App;
