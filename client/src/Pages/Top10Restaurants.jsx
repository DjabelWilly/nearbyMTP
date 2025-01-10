import axios from "axios";
import { useState, useEffect } from "react";

const Top10Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  /**
   * Fetches a list of restaurants within a specified radius from the local server
   * and updates the state with the results. Filters for places with an activity
   * type of "restaurant".
   *
   * Catches and logs any errors that occur during the fetch operation.
   */
  const displayRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { activity: "restaurant", radius: 5000 },
      });
      setRestaurants(response.data.places);
      console.log(response.data.places);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };
  useEffect(() => {
    displayRestaurants();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 mt-12">
        <h1 className="text-2xl font-semibold text-center">
          Notre top 10 des meilleurs restaurants à Montpellier
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6 mx-24">
          {restaurants
            .filter((restaurant) => restaurant.rating >= 4.5)
            .slice(0, 10)
            .map((restaurant) => (
              <div
                key={restaurant.place_id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                onClick={() => {
                  console.log(restaurant);
                }}
              >
                <h2 className="text-xl font-semibold mb-2">
                  {restaurant.name}
                </h2>
                <p className="mb-2">{restaurant.vicinity}</p>
                <p className="font-bold">Note: {restaurant.rating}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Top10Restaurants;
