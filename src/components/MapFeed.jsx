import React, { useState, useEffect } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const MapFeed = () => {
  const [locationData, setLocationData] = useState([]);
  // const [mapURL, setMapURL] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/locations`).then((res) => {
      setLocationData(res.data);
    });
  }, []);

  const originZoom = 17;
  const width = 512;
  const height = 412;
  const mapOrigin = {
    latitude: 1.3431959893186116,
    longitude: 103.68110593275408,
  };

  let locationArray;
  if (locationData) {
    locationArray = locationData
      .slice(5)
      .map(
        (location) =>
          `[${location.latitude},${location.longitude},"255,232,31","O"]`,
      )
      .join("|");
  }

  console.log(locationArray)

  let mapURL = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=grey&lat=${mapOrigin.latitude}&lng=${mapOrigin.longitude}&zoom=${originZoom}&width=${width}&height=${height}&points=${locationArray}`;

  return (
    <div>
      <img src={mapURL} alt="map" className="rounded-xl w-[850px] h-[650px] ml-36" />
    </div>
  );
};

export default MapFeed;
