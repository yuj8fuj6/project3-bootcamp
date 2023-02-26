import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "antd";
import Button from "./Button";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { CourseContext } from "../contexts/CourseContext";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const { Item } = Menu;

const MapSearch = () => {
  return <div>MapSearch</div>;
};

export default MapSearch;
