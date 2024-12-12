import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

/**
 * MapComponent displays a Google Map with markers for each place
 * in the given `places` array. If `isSelected` is true, it only displays
 * one marker for the selected place. The component also handles hovering
 * events to highlight the hovered marker. The map is centered on Montpellier
 * (43.6108, 3.8767) with a default zoom level of 11 and limits the zoom
 * to a minimum of 9 and a maximum of 18.
 *
 * @param {string} apiKey Google Maps API key
 * @param {object[]} places Array of places to display on the map
 * @param {boolean} isSelected Whether a place is selected or not
 * @param {function} setIsSelected Function to set `isSelected` state
 * @param {object} selectedPlace The selected place (if any)
 * @param {number} hoveredMarkerIndex The index of the hovered marker
 * @param {function} setSelectedPlace Function to set `selectedPlace` state
 * @returns {ReactElement} The MapComponent
 */
const MapComponent = ({
  apiKey,
  places,
  isSelected,
  setIsSelected,
  selectedPlace,
  hoveredMarkerIndex,
  setSelectedPlace,
}) => {
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: "100%", height: "70vh" }}
        defaultCenter={{ lat: 43.6108, lng: 3.8767 }} // Coordonnées de Montpellier par defaut
        mapId="DEMO_MAP_ID"
        defaultZoom={11}
        maxZoom={18}
        minZoom={9}
      >
        {/* Ajoute sur la carte les marqueurs des lieux trouvés */}
        {!isSelected &&
          places.map((place, index) => (
            <AdvancedMarker
              key={index}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              clickable={true}
              title={place.name}
              onClick={() => {
                setIsSelected(true);
                setSelectedPlace(place);
              }}
            >
              {/* Personnalisation du marqueur */}
              {/* Change la couleur et la taille du marqueur on hover */}
              <Pin
                background={
                  hoveredMarkerIndex === index ? "#FF0000" : "#FBBC04"
                }
                scale={hoveredMarkerIndex === index ? 1.3 : 1}
                glyphColor="#000"
                borderColor="#000"
              />
            </AdvancedMarker>
          ))}

        {/* Positionne sur la carte uniquement le marqueur du lieu sélectionné */}
        {isSelected && selectedPlace && (
          <AdvancedMarker
            position={{
              lat: selectedPlace.geometry.location.lat,
              lng: selectedPlace.geometry.location.lng,
            }}
            title={selectedPlace.name}
          >
            {/* Personnalisation du marqueur du lieu selectionné */}
            <Pin
              background="#FF0000" // Rouge
              scale={1}
              glyphColor="#000"
              borderColor="#000"
            />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
