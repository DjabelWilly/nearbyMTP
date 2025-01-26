import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";

/**
 * SearchForm is a React component for searching for places based on an activity and radius.
 *
 * Props:
 * - onResults: A callback function to pass the retrieved places to the parent component.
 *
 * State:
 * - activity: The activity to search for.
 * - radius: The radius to search within.
 *
 * Handles form submissions and makes an API call to fetch results based on the
 * specified activity and radius. If the API call is successful, it passes the
 * retrieved places to the parent component through the onResults callback. Displays
 * alerts and logs errors in case of invalid inputs or request failure.
 *
 * Returns:
 * A React component rendering a form with an input field for the activity and
 * a set of radio buttons for the radius. The form is submitted when the user
 * clicks the "Rechercher" button.
 */
const SearchForm = ({ onResults }) => {
  const [activity, setActivity] = useState(""); // Stocke l'activité recherchée
  const [radius, setRadius] = useState(5000); // Variable de rayon (par défaut : 5 km)

  // Fonction pour gérer la modification du champ d'activité
  /**
   * Handles changes to the activity input field.
   *
   * @param {Event} e - The event triggered by the input field change.
   *
   * Trims the input value and checks for special characters. If found, displays an alert and prevents state update.
   * Otherwise, updates the activity state with the valid input value.
   */
  const handleChangeActivity = (e) => {
    const rawValue = e.target.value.trim(); // supprime les espaces en debut et fin
    const regex = /[^\w\s]/; // Regex qui autorise seulement des lettres, chiffres et espaces

    if (regex.test(rawValue)) {
      alert("les caractères speciaux ne sont pas autorisés");
      return; // Empeche la mise à jour de l'activité si des caractères speciaux entrées
    }

    setActivity(rawValue); // Mise à jour de l'activité
  };

  /**
   * Handles the form submission to search for places based on the
   * specified activity and radius. Prevents the default form behavior,
   * checks if inputs are valid, and makes an API call to fetch results.
   * If the API call is successful, it passes the retrieved places to the
   * parent component through the onResults callback. Displays alerts and
   * logs errors in case of invalid inputs or request failure.
   *
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activity || !radius) {
      alert("Veuillez entrer une activité et sélectionner un rayon !");
      return;
    }

    console.log("Envoi de requête avec :", { activity, radius });

    try {
      const response = await axios.get(`${API_URL}/api/search`, {
        params: { activity, radius },
      });
      console.log(response.data);

      onResults(response.data.places); // Transmet les résultats au composant parent
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      alert(
        "Une erreur est survenue lors de la recherche. Veuillez réessayer."
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md sm:w-3/4 md:w-3/4 flex flex-col md:flex-row justify-around md:items-center p-2 pb-5 mx-8 sm:mx-auto space-y-4">
          {/* Champ de recherche */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              value={activity}
              onChange={handleChangeActivity} // Appel de la fonction lors de la modification du champ
              placeholder="Rechercher un lieu ou une activité"
              className="w-full mt-2 p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Radios pour le périmètre */}
          <div className="w-full md:w-1/3 sm:my-0 sm:pb-2">
            <label className="block text-gray-700 font-semibold mb-4">
              Périmètre :
            </label>
            <div className="flex gap-3 flex-wrap">
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
          <div className="mx-auto md:mx-0">
            <button
              type="submit"
              className="max-w-1/6 min-w-1/6 mx-auto p-2 bg-indigo-600 border-2 text-white py-2 rounded-lg hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border-2 transition-all duration-200 ease-in-out transform scale-100 active:scale-95 active:translate-y-0.5"
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
