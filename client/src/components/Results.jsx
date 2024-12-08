import React, { useState } from "react";

const Results = ({ places, isSelected, setIsSelected }) => {
  const [selectedPlace, setSelectedPlace] = useState(null); // Stocke le lieu choisi
  const [message, setMessage] = useState("");

  if (!places) {
    setMessage("Aucun lieu trouvé.");
  }

  // Affiche le lieu choisi
  const handleSelect = (place) => {
    setIsSelected(true);
    setSelectedPlace(place); // Mettre à jour le lieu selectionné
    console.log(place.name);
  };

  return (
    <div className="flex flex-col mt-8 mx-auto">
      {/* Affiche la liste des lieux */}
      {!isSelected && places.length > 0 && (
        <ul className="gap-4 w-3/4 mx-auto space-y-4">
          {places.map((place, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-lg w-full md:w-3/4 mx-auto p-2
               hover:bg-indigo-200 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
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
        <div className="mt-8 w-1/3 mx-auto bg-white rounded-lg shadow-lg p-4">
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
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
};

export default Results;
