import React, { useEffect, useState } from 'react';
import Results from './components/Results';
import SearchForm from './components/SearchForm';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import axios from 'axios';

const App = () => {
    const [places, setPlaces] = useState([]); // Stocke les résultats de la recherche
    const [isSelected, setIsSelected] = useState(false); // Indique si un lieu est choisi
    const [apiKey, setApiKey] = useState(null); // Stocke la clé API récupérée

    // Fonction pour obtenir la clé API (backend) de l'API Google Maps
    /**
 * Function to retrieve the API key for the Google Maps API.
 * 
 * @async
 * @throws {Error} If an error occurs while retrieving the API key.
 * @returns {string|null} The retrieved API key or null on error.
 */
    const getApiKey = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/key'); // route de l'API backend pour obtenir la clé
            const apiKey = response.data.apiKey;
            return apiKey;
        } catch (error) {
            console.error('Erreur de récupération de la clé API ', error);
            return null;
        }
    };

    // Appel de la fonction pour obtenir la clé API au montage du composant
    useEffect(() => {
        /**
         * Async function to fetch the API key from the backend API.
         * It calls getApiKey, logs the key in the console, and updates the apiKey state.
         */
        const fetchApiKey = async () => {
            const key = await getApiKey(); // Appel de la fonction et récupération de la clé
            setApiKey(key); // Mise à jour de l'état avec la clé récupérée
        };

        fetchApiKey(); // Appel de la fonction pour obtenir la clé API
    }, []);



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

    // Si la clé API n'est pas encore chargée, affichez un écran de chargement
    if (!apiKey) {
        return <div>Chargement de la carte...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-center text-4xl font-bold text-indigo-700 mb-8">
                Nearby Montpellier
            </h1>
            <h2 className="text-center text-2xl font-bold text-red-700 mb-8">
                Sortir à Montpellier et ses alentours
            </h2>
            <SearchForm onResults={handleSearch} setIsSelected={setIsSelected} />

            {/* Map Google --> affichée lorsque des lieux sont trouvés */}
            {places.length > 0 &&
                <div className="flex justify-center mt-8 w-3/4 mx-auto">
                    <APIProvider apiKey={apiKey}>
                        <Map
                            style={{ width: '100%', height: '70vh' }}
                            defaultCenter={{ lat: 43.6108, lng: 3.8767 }}  // Coordonnées de départ (Montpellier)
                            defaultZoom={12}
                            mapId='DEMO_MAP_ID'
                            onCameraChanged={(ev) => {
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }}
                        >
                            {/* Ajout des marqueurs pour chaque lieu */}
                            {places.map((place, index) => (
                                console.log(place.geometry.location),
                                <AdvancedMarker
                                    key={index}
                                    position={{
                                        lat: place.geometry.location.lat,
                                        lng: place.geometry.location.lng,
                                    }}
                                >
                                    {/* Personnalisation du marqueur */}
                                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                                </AdvancedMarker>
                            ))}

                        </Map>
                    </APIProvider>
                </div>
            }
            {/* Liste du résultat de la recherche des lieux */}
            <Results places={places} isSelected={isSelected} setIsSelected={setIsSelected} />

        </div >
    );
};

export default App;

