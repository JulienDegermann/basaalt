import '../assets/styles/concerts.css';
import { useEffect, useState } from 'react';
import Concert from '../components/Concert';
import Title from '../components/Title';
import axios from 'axios';

function Concerts() {

  const [lives, setLives] = useState([])

  useEffect(() => {

    const datas = async () => {
      try {
        const res = await axios.get("https://127.0.0.1:8000/api/lives")
        setLives(res.data['hydra:member'])
      } catch (e) {
        console.error(e)
      }
    }
    datas()
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
