import '../assets/styles/concerts.css';
import { useEffect, useState } from 'react';
import Concert from '../components/Concert';
import Title from '../components/Title';
import axios from 'axios';

function Concerts() {

  const [lives, setLives] = useState([])

  useEffect(() => {

    axios
    .get("https://127.0.0.1:8000/api/lives")
    .then((res) => {
      console.log(res.data['hydra:member'])
      setLives(res.data['hydra:member'])
    })
    .catch(e => console.log(e))
    setLives([
      {
        id: 1,
        event: "Le Ferrailleur",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert A",
        image: "basaalt.png"
      },
      {
        id: 2,
        event: "La nuit du métal",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert B",
        image: "basaalt.png"
      },
      {
        id: 3,
        event: "Concert 3",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert C",
        image: "basaalt.png"
      },
      {
        id: 4,
        event: "Concert 4",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert D",
        image: "basaalt.png"
      },
      {
        id: 5,
        event: "Concert 5",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert E",
        image: "basaalt.png"
      },
      {
        id: 6,
        event: "Concert 6",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert F",
        image: "basaalt.png"
      },
      {
        id: 7,
        event: "Concert 7",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert G",
        image: "basaalt.png"
      },
      {
        id: 8,
        event: "Concert 8",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert H",
        image: "basaalt.png"
      },
      {
        id: 9,
        event: "Concert 9",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert I",
        image: "basaalt.png"
      },
      {
        id: 10,
        event: "Concert 10",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert J",
        image: "basaalt.png"
      }])
  }, []);

  return (
    <>
      <section>
        <div className="container">

          <Title level="2" text="Toutes nos dates" />

          {lives.map((live) => (
            <Concert key={live.id} concert={live} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Concerts;
