import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation } from "react-router-dom";
import Results from './components/Results';
import SearchForm from './components/SearchForm';
import MapComponent from './components/MapComponent';
import PlaceDetails from './components/PlaceDetails';
import getLinkClass from './Utils/getLinkClass';
import { Home } from 'react-feather';
import ImagePanel from './components/ImagePanel';


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
    const location = useLocation(); // Detecte l'emplacement actuel de l'url dans le navigateur

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
        location.pathname = ''; // simule le chemin de la page d'accueil pour reset la classe du bouton home 
        newPlaces.length === 0
            ? setMessage('Oops 😓... aucun lieu ne correspond à votre recherche')
            : setMessage('');
    };

    // Si la clé API n'est pas encore chargée, affichez un écran de chargement
    if (!apiKey) {
        return <div>Chargement de la carte...</div>;
    }


    /**
     * Handles the click on the link buttons (Home, top10Restaurants, ...) by resetting the state
     * of the application to its initial state.
     *
     * Resets the places, selected place, is selected, hovered marker index,
     * and details state properties.
     */
    const handleClickLink = () => {
        setPlaces([]);
        setSelectedPlace(null);
        setIsSelected(false);
        setHoveredMarkerIndex(null);
        setDetails(null);
    };

    return (
        <div className="min-h-screen py-0 px-0 bg-gray-200">
            <div className="py-1 w-full">
                <h1 className="text-green-400 text-center text-4xl font-bold pt-2 pb-2 mx-2">
                    Nearby Montpellier
                </h1>
                <h2 className="text-center text-xl font-semibold text-stone-600">
                    Sortir à Montpellier et ses alentours
                </h2>
            </div>


            {/* Boutons de navigation top activités */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-2 mb-4  ">
                {/* Bouton de retour vers la page d'accueil */}
                <div className="flex justify-center items-center">
                    <Link to="/"
                        className={getLinkClass(location, '/')}
                        onClick={handleClickLink}
                    >
                        <Home size={24} />
                    </Link>
                </div>
                {/* Lien vers 10 meilleurs restaurants */}
                <div className="flex justify-center items-center">
                    <Link to="/top-10-restaurants"
                        className={getLinkClass(location, '/top-10-restaurants')}
                        onClick={handleClickLink}
                    >
                        Top 10 Restaurant
                    </Link>
                </div>
                {/* Lien vers Top escapades */}
                <div className="flex justify-center items-center">
                    <Link to="/escapades" className={getLinkClass(location, '/escapades')}>
                        Escapades nature
                    </Link>
                </div>
                {/* Lien vers les coups de coeur */}
                <div className="flex justify-center items-center">
                    <Link to="/coups-de-coeur" className={getLinkClass(location, '/coups-de-coeur')}>
                        Nos coups de ❤️
                    </Link>
                </div>
            </div>


            {/* Formulaire de recherche */}
            {/* Affichage du formulaire de recherche uniquement lorsque aucun lieu est choisi et l'url est sur la page d'accueil */}
            {!isSelected && location.pathname === '/' &&
                <SearchForm onResults={handleSearch} setIsSelected={setIsSelected} />
            }

            {/* Affichage des images page d'accueil */}
            {location.pathname === '/' &&
                <ImagePanel />
            }



            {/* Affichage des pages enfants avec react router */}
            <Outlet
                setSelectedPlace={setSelectedPlace}
                setIsSelected={setIsSelected}
            />


            {/* Liste du résultat de la recherche des lieux */}
            <div className="w-full mx-auto mt-6 flex flex-col sm:flex-row justify-center">
                {/* Affichage de la liste des lieux si l'url n'est pas sur la page d'accueil */}

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
                    <div className="sticky top-8 sm:w-2/3 w-full h-[70vh] mt-5 px-4 sm:px-2">
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


