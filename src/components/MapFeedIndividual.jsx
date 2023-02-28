import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { BACKEND_URL } from "../constants.js";

const MapFeedIndividual = () => {
  const [locationData, setLocationData] = useState([]);

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/locations`).then((res) => {
      setLocationData(res.data);
    });
  }, []);

  const originZoom = 18;
  const width = 512;
  const height = 412;

  let locationArray;
  if (locationData) {
    locationArray = locationData.filter(
      (location) => location.id == param.id,
    )[0];
  }

  let mapURL;
  if (locationData && locationArray) {
    mapURL = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=grey&lat=${locationArray.latitude}&lng=${locationArray.longitude}&zoom=${originZoom}&width=${width}&height=${height}&points=[${locationArray.latitude},${locationArray.longitude},"255,232,31","O"]`;
  }

  return (
    <div>
      {locationData && locationArray && (
        <div className="text-yellow ml-10 font-bold flex flex-row justify-between">
          <div>Location: {locationArray.location}</div>
          <button
            className="flex flex-row border-1 border-yellow rounded-full px-2 mb-3 hover:bg-darkgrey hover:text-yellow"
            onClick={() => navigate("/map")}
          >
            Go Back to Summary
          </button>
        </div>
      )}
      {locationData && (
        <img
          src={mapURL}
          alt="map"
          className="rounded-xl w-[850px] h-[590px] ml-10"
        />
      )}
    </div>
  );
};

export default MapFeedIndividual;
