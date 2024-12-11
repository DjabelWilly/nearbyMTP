import React from "react";

const PlaceDetails = ({ place, apiKey, setIsSelected }) => {
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
        <button
          className="mt-2 bg-gray-800 text-sm text-white p-2 py-1 hover:bg-gray-600 rounded shadow-md"
          onClick={() => setIsSelected(false)} // Retourner à la liste des lieux
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
