import React from "react";

/**
 * Results component displays a list of places and their details.
 * It takes in 6 props:
 * - places: an array of places to display
 * - isSelected: a boolean indicating whether a place is selected or not
 * - setIsSelected: a function to set the value of isSelected
 * - selectedPlace: the currently selected place
 * - setSelectedPlace: a function to set the value of selectedPlace
 * - message: a message to display if no place is found
 *
 * The component renders a list of places if isSelected is false, or the details of the selected place if isSelected is true.
 * Each place in the list is rendered as a card with its name, vicinity and rating.
 * The component also renders a message if no place is found.
 */
const Results = ({
  places,
  isSelected,
  setIsSelected,
  selectedPlace,
  setSelectedPlace,
  message,
}) => {
  // Affiche le lieu choisi
  const handleSelect = (place) => {
    setIsSelected(true);
    setSelectedPlace(place); // Mettre à jour le lieu selectionné
    console.log(place.name);
  };

  return (
    <div className="flex flex-col mt-8 mx-auto">
      {/* Affiche un message si aucun lieu n'est trouvé */}
      {message && (
        <p className="text-gray-600 font-semibold text-center">{message}</p>
      )}

      {/* Affiche la liste des lieux */}
      {!isSelected && places.length > 0 && (
        <ul className="gap-4 w-full sm:w-3/4 mx-auto space-y-4">
          {places.map((place, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-lg  mx-auto p-2
               hover:bg-blue-300 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => {
                handleSelect(place);
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
      {/* Affiche le details du lieu choisi */}
      {isSelected && selectedPlace && (
        <div className=" bg-white rounded-lg shadow-lg p-4 mb-4 w-full sm:w-3/4 mx-auto ">
          <h3 className="text-xl font-semibold">{selectedPlace.name}</h3>
          <p className="text-gray-600">{selectedPlace.vicinity}</p>
          <p className="text-gray-600">
            {selectedPlace.types
              .map((type) => type)
              .slice(0, 2)
              .join(", ")
              .replace("_", " ")}
          </p>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-500">
              Note: {selectedPlace.rating || "Pas de note"}
            </p>
            <p
              className={`text-sm text-gray-500 ${
                selectedPlace.opening_hours?.open_now
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedPlace.opening_hours?.open_now
                ? "Ouvert actuellement"
                : "Fermé actuellement"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
