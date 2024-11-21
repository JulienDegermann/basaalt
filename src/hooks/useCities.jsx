// dependencies
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../core/AxiosInstance";

export const CitiesContext = createContext();

export function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [searchCity, setSearchCity] = useState('');

  const citiesDatas = async () => {
    // const params = {
    //   name: "",
    //   zipCode: "",
    // };

    // const values = searchCity?.split(" ");
    // values.map((value) => {
    //   isNaN(value) ? (params.name = value) : (params.zipCode = value);
    // });
    
    const params = new URLSearchParams();

    searchCity.split(" ").map((value) => {
      isNaN(value) ? params.append("name", value) : params.append("zipCode", value);
    });

    try {
      const res = await axiosInstance.get(`/api/cities?${params.toString()}`);
      setCities(res.data["hydra:member"]);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    citiesDatas(searchCity);
  }, [searchCity]);

  return (
    <CitiesContext.Provider value={{ cities, searchCity, setSearchCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

CitiesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
