import React from "react";
import "../styles/GeoCard.css";

const GeoCard = ({ data, isMyIp }) => {
  if (!data) return null;

  const fields = [
    { label: "IP Address", value: data.ip },
    { label: "Hostname", value: data.hostname || "—" },
    { label: "City", value: data.city || "—" },
    { label: "Region", value: data.region || "—" },
    { label: "Country", value: data.country || "—" },
    { label: "Location", value: data.loc || "—" },
    { label: "Organization", value: data.org || "—" },
    { label: "Timezone", value: data.timezone || "—" },
    { label: "Postal", value: data.postal || "—" },
  ];

  return (
    <div className="geo-card">
      <div className="geo-card__header">
        <span className="geo-card__badge">{isMyIp ? "Your IP" : "Searched IP"}</span>
        <h2 className="geo-card__ip">{data.ip}</h2>
        {data.city && data.country && (
          <p className="geo-card__location-text">{data.city}, {data.country}</p>
        )}
      </div>
      <div className="geo-card__grid">
        {fields.map((field) => (
          <div className="geo-card__field" key={field.label}>
            <span className="geo-card__field-label">{field.label}</span>
            <span className="geo-card__field-value">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeoCard;