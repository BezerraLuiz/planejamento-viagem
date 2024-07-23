import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useCallback } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

export default function Places() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGdOdZFKEi9rac-WGfGKwgkkjguVktcmk"
  })

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [location, setLocation] = useState("");

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBGdOdZFKEi9rac-WGfGKwgkkjguVktcmk`);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setCenter({ lat, lng });
        if (map) {
          map.panTo({ lat, lng });
        }
      } else {
        console.error('Geocode was not successful for the following reason:', data.status);
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter ZIP code or location"
      />
      <button onClick={handleSearch}>Search</button>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : <></>}
    </>
  );
}
