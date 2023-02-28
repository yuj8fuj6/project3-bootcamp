import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const MapSearch = () => {
  const [locationData, setLocationData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filterState, setFilterState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/locations`).then((res) => {
      setLocationData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="rounded-lg text-yellow font-semibold pt-5 bg-white h-[625px]">
        <p className="px-5 pb-5 text-base text-darkgrey font-extrabold">
          SEARCH COURSE LOCATION
        </p>
        <Formik initialValues={{ query: "" }}>
          {(formikProps) => {
            return (
              <Form className="mb-5 ml-5">
                <div className="form-group has-feedback has-clear flex flex-row gap-3">
                  <Field
                    className="form-control text-darkgrey border-darkgrey border-2 rounded-lg p-2"
                    name="query"
                    placeholder="Search By Index"
                    onChange={(e) => {
                      formikProps.handleChange(e);
                      const search = locationData.filter(
                        (location) =>
                          location.course_code
                            .toLowerCase()
                            .includes(e.target.value) ||
                          location.course_code
                            .toUpperCase()
                            .includes(e.target.value) ||
                          location.course_name
                            .toLowerCase()
                            .includes(e.target.value) ||
                          location.course_name
                            .toUpperCase()
                            .includes(e.target.value) ||
                          location.index_code
                            .toString()
                            .includes(e.target.value),
                      );
                      setFilteredLocations(search);
                      setFilterState(true);
                    }}
                    value={formikProps.values.query}
                  />
                  <div className="text-right">
                    <button
                      type="reset"
                      className="btn btn-primary p-2 rounded-lg text-yellow bg-darkgrey"
                      value="Reset"
                      disabled={!formikProps.values.query}
                      onClick={() => {
                        formikProps.resetForm();
                        setFilterState(false);
                        navigate("/map")
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="h-[475px] overflow-auto px-2">
          <ul className="menu bg-base-100 p-2 h-[450px] rounded-box gap-3">
            {locationData &&
              !filterState &&
              locationData.map((location) => (
                <Link to={`/map/${location.id}`}>
                  <li
                    key={location.id}
                    className="bg-darkgrey rounded-xl hover:bg-yellow hover:text-darkgrey px-6"
                  >
                    <a>{location.index_code}</a>
                  </li>
                </Link>
              ))}
            {locationData &&
              filterState &&
              filteredLocations.map((location) => (
                <Link to={`/map/${location.id}`}>
                  <li
                    key={location.id}
                    className="bg-darkgrey rounded-xl hover:bg-yellow hover:text-darkgrey px-6"
                  >
                    <a>{location.index_code}</a>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
