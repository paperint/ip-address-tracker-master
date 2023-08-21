import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import CoverImage from "../components/CoverImage";
import InputIP from "../components/InputIP";

function Homepage() {
  const [ipData, setIpData] = useState(null);
  const [position, setPosition] = useState([200, 200]);

  console.log(position);
  console.log(ipData);

  useEffect(() => {
    const getDataWhenOpen = async () => {
      try {
        const result = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_J6HB3PIh66Z7QvzVBuXnAd9yoO6tP&ipAddress=8.8.8.8`
        );
        setIpData(result.data);
        setPosition([result.data.location.lat, result.data.location.lng]);
      } catch (error) {
        console.log(error);
      }
    };
    getDataWhenOpen();
  }, []);
  return (
    <section className="h-screen bg-black">
      <CoverImage ipData={ipData} position={position} />
      <InputIP
        ipData={ipData}
        setIpData={setIpData}
        setPosition={setPosition}
      />
    </section>
  );
}

export default Homepage;
