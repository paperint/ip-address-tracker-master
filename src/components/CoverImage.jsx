import React from "react";
import DesktopImage from "../assets/images/pattern-bg-desktop.png";
import MobileImage from "../assets/images/pattern-bg-mobile.png";
import icon from "../assets/images/icon.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function CoverImage({ ipData, position }) {
  function MapMove({ position }) {
    const map = useMap();

    map.flyTo(position, 13, {
      animate: true,
    });

    return null;
  }

  return (
    <article className="absolute top-0 left-0 w-full">
      <picture>
        <source media="(min-width:768px )" srcSet={DesktopImage} />
        <img
          src={MobileImage}
          alt="Cover"
          className="object-cover w-full h-60"
        />
      </picture>
      {ipData !== null && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", minHeight: "80vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={icon} position={position}>
            <Popup>
              {ipData.location.city}, <br />
              {ipData.location.region},
              <br />
              {ipData.location.country}
            </Popup>
          </Marker>
          <MapMove position={position} />
        </MapContainer>
      )}
    </article>
  );
}

export default CoverImage;
