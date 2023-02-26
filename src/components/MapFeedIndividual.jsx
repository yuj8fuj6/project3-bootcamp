import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const MapFeedIndividual = () => {
  // const [locationData, setLocationData] = useState([]);
  // const [mapURL, setMapURL] = useState("");

  const originZoom = 17;
  const width = 512;
  const height = 512;
  const mapOrigin = {
    latitude: 1.3450052275449973,
    longitude: 103.68234365882233,
  };
  const locationData = {
    latitude: 1.343572587250799,
    longitude: 103.68106886194161,
    id: 1,
  };
  let mapURL = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=grey&lat=${mapOrigin.latitude}&lng=${mapOrigin.longitude}&zoom=${originZoom}&width=${width}&height=${height}&points=[${locationData.latitude},${locationData.longitude},"175,50,0","${locationData.id}"]`;

  return (
    <div>
      <img src={mapURL} alt="map" className="rounded-xl" />
    </div>
  );
};

export default MapFeedIndividual;
