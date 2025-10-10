import React, { useRef, useEffect } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const OpenFreeMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: "https://tiles.openfreemap.org/styles/liberty",
        center: [78.9629, 20.5937],
        zoom: 4.5,
    });
      new maplibregl.Marker()
    .setLngLat([72.8777, 19.0760]) // [longitude, latitude]
    .setPopup(new maplibregl.Popup().setHTML("<b>Mumbai</b>"))
    .addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default OpenFreeMap;
