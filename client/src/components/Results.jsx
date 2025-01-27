import React from "react";
import axios from "axios";
import { API_URL } from "../config/constants";

/**
 * Results component displays a list of places returned from the search.
 * It provides a `handleSelect` function to update the selected place and
 * fetch additional details from the backend. It also handles the hovered
 * marker index to highlight the place on the map and reset it when the
 * mouse leaves the list item.
 *
 * @param {object[]} places Array of places returned from the search.
 * @param {boolean} isSelected Whether a place is selected or not.
 * @param {function} setIsSelected Function to update `isSelected` state.
 * @param {function} setSelectedPlace Function to update `selectedPlace` state.
 * @param {string} message Error message if no places are found.
 * @param {function} setHoveredMarkerIndex Function to update `hoveredMarkerIndex` state.
 * @param {function} setDetails Function to update `details` state with the fetched place details.
 * @returns {ReactElement} The Results component.
 */
const Results = ({
  places,
  isSelected,
  setIsSelected,
  setSelectedPlace,
  message,
  setHoveredMarkerIndex,
  setDetails,
}) => {
  // Fonction pour choisir un lieu
  const handleSelect = async (place) => {
    setIsSelected(true);
    setSelectedPlace(place);
    console.log(place.place_id);

    try {
      // Requête vers l'api
      const response = await axios.get(`${API_URL}/api/details`, {
        params: { place_id: place.place_id },
      });
      console.log(response.data);
      setDetails(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du lieu",
        error
      );
    }
  };

  return (
    <div className="flex flex-col mt-5">
      {/* Affiche un message si aucun lieu n'est trouvé */}
      {message && (
        <p className="text-gray-600 font-semibold text-center">{message}</p>
      )}

      {/* Affiche la liste des lieux */}
      {!isSelected && places.length > 0 && (
        <ul className=" w-full mx-auto space-y-4">
          {places.map((place, index) => (
            <li
              key={index}
              className="bg-white rounded-sm shadow-lg px-4 py-2
               hover:bg-blue-200 hover:cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
              onClick={() => {
                handleSelect(place); // Mettre à jour le lieu selectionné
              }}
              onMouseOver={() => {
                setHoveredMarkerIndex(index); // Mettre à jour l'index du marqueur survolé
              }}
              onMouseOut={() => {
                setHoveredMarkerIndex(null); //Reset l'index du marqueur survolé
              }}
            >
              <h3 className="text-xl font-semibold">{place.name}</h3>
              <p className="text-gray-600">{place.vicinity}</p>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">
                  Note: {place.rating || "Pas de note"}
                </p>
                <p
                  className={`text-sm text-gray-500 ${
                    place.opening_hours?.open_now
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {place.opening_hours?.open_now
                    ? "Ouvert actuellement"
                    : "Fermé actuellement"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
