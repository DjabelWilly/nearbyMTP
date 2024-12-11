import React, { useState } from "react";
import axios from "axios";

/**
 * SearchForm component allows users to search for places based on a specified activity and radius.
 * On form submission, it sends a request to an API and returns the search results.
 *
 * Props:
 * - onResults: A function to handle the search results returned by the API.
 *
 * State:
 * - activity: The activity to search for (e.g., cinema, museum).
 * - radius: The search radius in meters, with a default value of 5000 (5 km).
 * - loading: A boolean indicating whether a search request is in progress.
 *
 * Returns:
 * A form with inputs for activity and radius, and a submit button to trigger the search.
 */
const SearchForm = ({ onResults }) => {
  const [activity, setActivity] = useState(""); //Stocke l'activité recherchée
  const [radius, setRadius] = useState(5000); // variable de rayon, (par défaut : 5 km)

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior, then checks if the activity and radius fields are filled.
   * If they are, sends a request to the API with the specified activity and radius as query parameters.
   * On success, calls the onResults function with the response data, which is an array of places.
   * If an error occurs, displays an alert with an error message.
   * Finally, sets the loading state back to false.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activity || !radius) {
      alert("Veuillez entrer une activité et sélectionner un rayon !");
      return;
    }

    console.log("Envoi de requête avec:", { activity, radius });

    try {
      // Récupération des paramètres activité et rayon depuis le client, puis transmet la requête à l'API backend
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { activity, radius },
      });
      console.log(response.data);

      // Transmet les résultats au component parent
      onResults(response.data.places);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      alert(
        "Une erreur est survenue lors de la recherche. Veuillez réessayer."
      );
    }
  };

  return (
    <>
      {/* Formulaire de recherche */}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md md:w-4/5 flex flex-col md:flex-row justify-around md:items-center p-2 pb-5 mt-4 mb-8 mx-4 md:mx-auto space-y-4  ">
          {/* Input de recherche */}
          <div className=" w-full md:w-1/3">
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Rechercher un lieu ou une activité"
              className="w-full mt-2 p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Radios pour le périmètre */}
          <div className="w-full md:w-1/3 sm:my-0 sm:pb-2 ">
            <label className="block text-gray-700 font-semibold mb-4">
              Périmètre :
            </label>
            <div className="flex gap-3 flex-wrap ">
              {[
                { label: "5 km", value: 5000 },
                { label: "10 km", value: 10000 },
                { label: "20 km", value: 20000 },
                { label: "30 km", value: 30000 },
              ].map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="radius"
                    value={option.value}
                    checked={radius === option.value}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="form-radio text-indigo-500"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Bouton de recherche */}
          <div className="mx-auto md:mx-0 ">
            <button
              type="submit"
              className=" max-w-1/6 min-w-1/6 mx-auto p-2 bg-indigo-600 border-2 
                 text-white py-2 rounded-lg hover:bg-white hover:text-indigo-600
                  hover:border-indigo-600 hover:border-2 transition-all duration-200 ease-in-out transform scale-100 active:scale-95 active:translate-y-0.5"
            >
              Rechercher
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
