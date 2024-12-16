import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Results from './components/Results';
import SearchForm from './components/SearchForm';
import MapComponent from './components/MapComponent';
import PlaceDetails from './components/PlaceDetails';


/**
 * App component is the main entry point of the application,
 * managing the state and logic for displaying search results,
 * selected place details, and the map. It fetches the Google Maps
 * API key from the backend, handles the search results, and manages
 * the selected place and hovered marker states.
 *
 * State:
 * - places: Array of places returned from the search.
 * - selectedPlace: The currently selected place for detailed view.
 * - isSelected: Boolean indicating if a place is selected.
 * - apiKey: Google Maps API key.
 * - message: Error message or empty string if no error.
 * - hoveredMarkerIndex: Index of the currently hovered marker.
 *
 * Returns:
 * A React component rendering the search form, results, selected place details,
 * and the map based on the current state.
 */
const App = () => {
    const [places, setPlaces] = useState([]); // Stocke les résultats de la recherche
    const [selectedPlace, setSelectedPlace] = useState(null); // Stocke le lieu choisi
    const [isSelected, setIsSelected] = useState(false); // Indique si un lieu est choisi
    const [apiKey, setApiKey] = useState(null); // Stocke la clé API récupérée
    const [message, setMessage] = useState(''); // Stocke le message d'erreur si besoin 
    const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState(null); // Indique quel marqueur est survolé
    const [details, setDetails] = useState(null); // Stocke des détails complémentaires du lieu choisi (site web, tel, etc.)

    // Fonction pour obtenir la clé API (backend)
    const getApiKey = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/key');
            const apiKey = response.data.apiKey;
            return apiKey;
        } catch (error) {
            console.error('Erreur de récupération de la clé API ', error);
            return null;
        }
    };

    // Appel de la fonction pour obtenir la clé API au montage du composant
    useEffect(() => {
        const fetchApiKey = async () => {
            const key = await getApiKey();
            setApiKey(key);
        };

        fetchApiKey();
    }, []);



    /**
     * Handles the search results by updating the state with the new places.
     * If the search returns no results, it sets an error message.
     *
     * @param {object[]} newPlaces The new places returned from the search.
     */
    const handleSearch = (newPlaces) => {
        setPlaces(newPlaces);
        setIsSelected(false);
        newPlaces.length === 0
            ? setMessage('Oops 😓... aucun lieu ne correspond à votre recherche')
            : setMessage('');
    };




    // Si la clé API n'est pas encore chargée, affichez un écran de chargement
    if (!apiKey) {
        return <div>Chargement de la carte...</div>;
    }

    return (
        <div className="min-h-screen py-0 px-0 bg-gray-200">
            <div className="py-1 w-full">
                <h1 className="text-stone-800 text-center text-4xl font-bold pt-3 pb-2 mx-2">
                    Nearby Montpellier
                </h1>
                <h2 className="text-center text-xl font-semibold text-stone-500">
                    Sortir à Montpellier et ses alentours
                </h2>
            </div>

            {/* Formulaire de recherche */}
            {!isSelected &&
                <SearchForm onResults={handleSearch} setIsSelected={setIsSelected} />
            }

            {/* Liste du résultat de la recherche des lieux */}
            <div className="w-full mx-auto mt-6 flex flex-col sm:flex-row justify-center">

                <div className="w-full sm:w-1/2 flex flex-col px-4">
                    <Results
                        places={places}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        setSelectedPlace={setSelectedPlace}
                        selectedPlace={selectedPlace}
                        message={message}
                        setHoveredMarkerIndex={setHoveredMarkerIndex}
                        setDetails={setDetails}

                    />

                    {/* Affichage des détails du lieu sélectionné */}
                    <div className="w-full flex flex-col ">
                        {isSelected && selectedPlace && (
                            <PlaceDetails
                                place={selectedPlace}
                                apiKey={apiKey}
                                setIsSelected={setIsSelected}
                                setHoveredMarkerIndex={setHoveredMarkerIndex}
                                details={details}
                            />
                        )}
                    </div>
                </div>

                {/* Affichage de la map google */}
                {places.length > 0 && (
                    <div className="sticky top-20 sm:w-2/3 w-full h-[70vh] mt-5 px-4 sm:px-2">
                        <MapComponent
                            apiKey={apiKey}
                            places={places}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                            selectedPlace={selectedPlace}
                            hoveredMarkerIndex={hoveredMarkerIndex}
                            setSelectedPlace={setSelectedPlace}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;


