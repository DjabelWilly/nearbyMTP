import React from "react";

/**
 * Results component displays a list of places based on the search query.
 * It handles the selection of a place and displays a message if no places are found.
 *
 * Props:
 * - places: An array of places to display.
 * - isSelected: A boolean indicating if a place is currently selected.
 * - setIsSelected: A function to update the selected state.
 * - setSelectedPlace: A function to update the selected place.
 * - message: A string to display if no places are found.
 * - setHoveredMarkerIndex: A function to update the index of the hovered marker.
 *
 * Returns:
 * A component displaying a list of places with their name, vicinity, rating, and opening hours.
 * If no places are found, it displays a message.
 * If a place is selected, it displays a detail view of the selected place.
 */
const Results = ({
  places,
  isSelected,
  setIsSelected,
  setSelectedPlace,
  message,
  setHoveredMarkerIndex,
}) => {
  // Fonction pour choisir un lieu
  const handleSelect = (place) => {
    setIsSelected(true);
    setSelectedPlace(place); // Mettre à jour le lieu selectionné
    console.log(place);
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
