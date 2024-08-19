import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

export default function Places({ location }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBGdOdZFKEi9rac-WGfGKwgkkjguVktcmk",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(14); // Define o zoom inicial

  const onLoad = useCallback(
    (map) => {
      setMap(map);
      // Não redefina o zoom no onLoad, mantenha o valor padrão
    },
    []
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (location) {
      const fetchGeocode = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBGdOdZFKEi9rac-WGfGKwgkkjguVktcmk`
          );
          const data = await response.json();
          if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            setCenter({ lat, lng });
            if (map) {
              map.panTo({ lat, lng });
              map.setZoom(14); // Certifique-se de definir o zoom aqui
            }
          } else {
            console.error("Geocode sem sucesso pelo seguinte erro: ", data.status);
          }
        } catch (error) {
          console.error("Erro na busca geocode: ", error);
        }
      };

      fetchGeocode();
    }
  }, [location, map, zoom]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom} // Define o zoom inicial aqui
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Adicione componentes filhos, como marcadores, janelas de informações, etc. */}
        </GoogleMap>
      ) : (
        <div>Carregando mapa...</div>
      )}
    </>
  );
}
