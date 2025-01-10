import React from "react";

/**
 * PlaceDetails is a React component that displays detailed information
 * about a selected place. It shows the place's name, address, opening
 * hours, rating, phone number, website, and a photo if available. It
 * also includes a button to return to the list of places.
 *
 * Props:
 * - place: An object containing basic information about the place, such as
 *   name, opening hours, rating, user ratings total, and photos.
 * - apiKey: A string representing the Google Maps API key for fetching
 *   place photos.
 * - setIsSelected: A function to update the selected state, allowing users
 *   to return to the list of places.
 * - setHoveredMarkerIndex: A function to reset the hovered marker index
 *   when returning to the list.
 * - details: An object containing additional details about the place, such
 *   as formatted address, formatted phone number, and website.
 *
 * Returns:
 * A React element displaying the detailed information about the place.
 */
const PlaceDetails = ({
  place,
  apiKey,
  setIsSelected,
  setHoveredMarkerIndex,
  details,
}) => {
  const { name, opening_hours, rating, user_ratings_total, photos } =
    place || {};
  const { formatted_address, formatted_phone_number, website } = details || {};

  console.log(details);

  return (
    <div className="bg-white p-4 rounded-sm shadow-md flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-stone-800">{name}</h3>

        {/* Bouton de retour vers la liste des lieux */}
        <button
          className="mt-2 bg-gray-800 text-sm text-white p-2 py-1 hover:bg-gray-600 rounded shadow-md"
          onClick={() => {
            setIsSelected(false); // Retourner à la liste des lieux
            setHoveredMarkerIndex(null); // Reset l'index du marker pour revenir à la couleur par default
          }}
        >
          Retour
        </button>
      </div>
      <p className="text-lg text-stone-500">{formatted_address}</p>

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

      {formatted_phone_number && (
        <p className="mt-2 text-sm text-stone-600">
          Téléphone : {formatted_phone_number}
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
