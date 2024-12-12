# Nearby Montpellier - React App

This is a React application that allows users to search for nearby places and activities around Montpellier. It uses the Google Places API to fetch search results and display them on a map. Users can filter results by activity and radius and view detailed information about each place.


## Features

- Search Form: Users can enter an activity and select a radius (5km, 10km, 20km, or 30km) to search for nearby places.
- Results List: Displays a list of places with information such as name, rating, and opening status.
- Place Details: Displays detailed information about a selected place, including contact info, opening hours, and photos.
- Interactive Map: A map is displayed with markers for each search result. Users can hover over or select a marker to see details about the place.
- Error Handling: Displays error messages when no places are found or when there are issues with fetching data.


## Technologies

- **Node.js**: A JavaScript runtime used for building the backend server.
- **Express**: A web framework for Node.js used to handle routing and API requests.
- **React**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the backend to fetch search results.
- **Google Maps API**: For displaying a map and fetching place data.
- **Tailwind CSS**: For styling the app using utility-first CSS.


## Installation

1. Clone the repository

2. Install dependencies: 
`npm install`

3. Set up the backend: 
Ensure that your backend is running and able to provide a valid Google API key.

4. Set the Google API Key:
Inside the api directory, create a .env file and add the following line with your Google API key:
`API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key`

5. Run the application:
`npm start`
The app should now be running on http://localhost:3000


## Usage

1. Search for a Place: Enter the name of an activity (e.g., "musée") and select a radius to search for places nearby Montpellier.

2. View Results: A list of places will be shown with their name, vicinity, rating, and opening status. 
Hover over the list to locate the place on the map, and click on a place to view more details.

3. View Map: A Google Map with markers representing the places is displayed. Hover over or click on a marker to view more information.

4. Place Details: Clicking on a place will show additional details such as phone number, website, and a photo (if available).


## Improvements

Here are some potential improvements and new features that could be added to this application in the future:

1. Link to Website of the Place
2. User Reviews
3. Filter by Rating
4. User Authentication

