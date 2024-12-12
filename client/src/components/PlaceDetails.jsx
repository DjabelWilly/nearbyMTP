import React from "react";

/**
 * PlaceDetails component displays detailed information about a selected place.
 * It shows the place's name, vicinity, opening hours, rating, phone number,
 * website, and an image if available. It also provides a button to return to
 * the list of places, resetting the selected state and hovered marker index.
 *
 * Props:
 * - place: An object containing details of the selected place.
 * - apiKey: The Google Maps API key used to fetch place photos.
 * - setIsSelected: A function to update the selected state of a place.
 * - setHoveredMarkerIndex: A function to reset the hovered marker index.
 *
 * Returns:
 * A React component rendering detailed information about the selected place.
 */
const PlaceDetails = ({
  place,
  apiKey,
  setIsSelected,
  setHoveredMarkerIndex,
}) => {
  const {
    name,
    vicinity,
    opening_hours,
    rating,
    user_ratings_total,
    phone_number,
    website,
    photos,
  } = place || {};

  return (
    <div className="bg-white p-4 rounded-sm shadow-md flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-stone-800">{name}</h3>

        {/* Bouton de retour vers la liste des lieux */}
        <button
          className="mt-2 bg-gray-800 text-sm text-white p-2 py-1 hover:bg-gray-600 rounded shadow-md"
          onClick={() => {
            setIsSelected(false); // Retourner à la liste des lieux
            setHoveredMarkerIndex(null); // Reset l'index pour revenir à la couleur par default
          }}
        >
          Retour
        </button>
      </div>
      <p className="text-lg text-stone-500">{vicinity}</p>

      {opening_hours && (
        <p className="mt-2 text-sm text-stone-600">
          {opening_hours.open_now
            ? "Ouvert actuellement"
            : "Fermé actuellement"}
        </p>
      )}

      {rating && (
        <p className="mt-2 text-sm text-stone-600">
          Note : {rating} ({user_ratings_total} avis)
        </p>
      )}

      {phone_number && (
        <p className="mt-2 text-sm text-stone-600">
          Téléphone : {phone_number}
        </p>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm text-blue-500"
        >
          Site web
        </a>
      )}

      {photos && photos.length > 0 && photos[0].photo_reference && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${apiKey}`}
          alt={name}
          className="mt-4 w-full h-80 rounded-lg object-cover"
        />
      )}
    </div>
  );
};

export default PlaceDetails;
