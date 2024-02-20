import '../assets/styles/concerts.css';
import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Concert from '../components/Concert.jsx';
import Title from '../components/Title.jsx';
import Footer from '../components/Footer.jsx';

function Concerts() {

  const [concerts, setConcerts] = useState([])

  useEffect(() => {
    setConcerts([
      {
        id: 1,
        event: "Concert 1",
        datetime: new Date("2024-02-21T20:45:00"),
        location: "Salle de concert A",
        image: "basaalt.png"
      },
      {
        id: 2,
        event: "Concert 2",
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
      <Header />
      <section>
        <div className="container">
          <Title text="Concerts" />
          {concerts.map((concert) => (
            <Concert key={concert.id} concert={concert} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Concerts;
