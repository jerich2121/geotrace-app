import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "../styles/MapView.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RecenterMap = ({ coords }) => {
  const map = useMap();
  React.useEffect(() => {
    if (coords) map.setView([coords.lat, coords.lng], 10, { animate: true });
  }, [coords, map]);
  return null;
};

const MapView = ({ coords, label }) => {
  if (!coords) return null;
  return (
    <div className="map-container">
      <MapContainer center={[coords.lat, coords.lng]} zoom={10} scrollWheelZoom={false} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup><strong>{label || "IP Location"}</strong></Popup>
        </Marker>
        <RecenterMap coords={coords} />
      </MapContainer>
    </div>
  );
};

export default MapView;