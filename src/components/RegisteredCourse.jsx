import React, { useEffect, useState} from "react";
import Button from "../components/Button";
import axios from "axios";
import useSWR from "swr";
import { BACKEND_URL } from "../constants";
import { UserContext } from "../contexts/UserContext";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const RegistedCourses = () => {
  
}