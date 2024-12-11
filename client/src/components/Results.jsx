import React from "react";

const Results = ({
  places,
  isSelected,
  setIsSelected,
  selectedPlace,
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
      {/* Affiche le details du lieu choisi */}
      {/* {isSelected && selectedPlace && (
        <div className="bg-white rounded-sm shadow-lg w-full px-4 mx-auto py-2">
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
            <p className="text-sm text-gray-600">
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
      )} */}
    </div>
  );
};

export default Results;
