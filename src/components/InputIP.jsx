import React, { useEffect, useState } from "react";
import arrow from "../assets/images/icon-arrow.svg";
import axios from "axios";

function InputIP({ ipData, setIpData, setPosition }) {
  const [ip, setIp] = useState("");

  const getIP = async (ip) => {
    try {
      const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
      const result = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
      );
      console.log(result.data);
      setIpData(result.data);
      setPosition([result.data.location.lat, result.data.location.lng]);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    getIP(ip);
  };

  useEffect(() => {
    getIP();
  }, handlerSubmit);

  return (
    <article
      className="relative z-50 w-full max-w-5xl p-6 mx-auto md:mt-5"
      style={{ zIndex: "1000" }}
    >
      <div className="flex flex-col items-center justify-center gap-2 md:gap-7 ">
        <h1 className="text-4xl font-medium text-white">IP Address Tracker</h1>
        <form onSubmit={handlerSubmit} className="relative w-full max-w-lg">
          <input
            type="text"
            id="iptext"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-4 py-2 text-lg rounded-lg "
          />
          <button
            type="submit"
            className="absolute right-0 h-full px-4 py-3 rounded-r-lg bg-very-dark-gray"
          >
            <img src={arrow} alt="arrow" />
          </button>
        </form>

        <div className="w-full max-w-5xl bg-white rounded-xl">
          <ul className="flex flex-col justify-center w-full p-5 max-md:gap-2 max-md:items-center max-md:justify-center md:p-10 md:flex-row">
            <li className="w-full mx-5 text-center md:border-r-2">
              <p className="text-sm font-bold uppercase text-dark-gray">
                ip address
              </p>
              <h2 className="text-lg font-medium text-very-dark-gray">
                {ipData !== null && ipData.ip}
              </h2>
            </li>
            <li className="w-full mx-5 text-center md:border-r-2 ">
              <p className="text-sm font-bold uppercase text-dark-gray">
                Location
              </p>
              <h2 className="text-lg font-medium text-very-dark-gray">
                {ipData !== null &&
                  `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`}
              </h2>
            </li>
            <li className="w-full mx-5 text-center md:border-r-2 ">
              <p className="text-sm font-bold uppercase text-dark-gray">
                TIMEZONE
              </p>
              <h2 className="text-lg font-medium text-very-dark-gray">
                {ipData !== null && `UTC ${ipData.location.timezone}`}
              </h2>
            </li>
            <li className="w-full mx-5 text-center ">
              <p className="text-sm font-bold uppercase text-dark-gray">ISP</p>
              <h2 className="text-lg font-medium text-very-dark-gray">
                {ipData !== null && ipData.isp}
              </h2>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default InputIP;
