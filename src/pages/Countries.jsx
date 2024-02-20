import { useState, useEffect } from 'react';
import Title from '../components/Title.jsx';
import CountryCard from '../components/CountryCard.jsx';
import axios from 'axios';
import '../assets/styles/countries.css';


function Countries() {
  const [datas, setData] = useState([]);
  const [filter, setFilter] = useState(12);
  const [selectedRadio, setSelectedRadio] = useState("");
  const continents = ['Africa', 'Europe', 'America', 'Asia', 'Oceania'];

  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get(
          url
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, []);

  function onChange(event) {
    setFilter(event.target.value);
  }

  return (
    <>
      <div className="container">
        <Title text="Liste des pays REACT" />
        Filtrer selon le contient:
        <ul className="radio">

          {continents.map((continent, index) => {
            return (
              <li key={index}>
                <label htmlFor={continent}>
                  <input
                    type="radio"
                    id={continent}
                    name="selectedRadio"
                    checked={continent === selectedRadio}
                    onChange={(e) => setSelectedRadio(e.target.id)} />
                  {continent}
                </label>
              </li>
            )
          })}
        </ul>
        {
          selectedRadio && (
            <button onClick={() => setSelectedRadio("")}>
              Reset
            </button>
          )
        }

        <br />

        Nombre de pays à afficher : <span>1</span>
        <div className="flex inline-flex  justify-center align-center inline">
          <p>{filter}</p>
          <input
            type="range"
            min="1"
            max="250"
            onChange={onChange}
            defaultValue={filter} />
        </div>
        <span>250</span>
        <div className="flex justify-center">
          {datas
            .filter((country) => country.continents[0].includes(selectedRadio))
            .slice(0, filter)
            .map((country, index) =>
              <CountryCard key={index} country={country} />
            )}
        </div>
      </div>

    </>
  )
}

export default Countries;
