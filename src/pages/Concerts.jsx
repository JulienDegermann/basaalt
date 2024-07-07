// dependecies
import { useEffect, useState } from 'react';
import axios from 'axios';

// components
import Concert from '../components/Concert';
import Section from '../components/Section';

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
      <Section
        title="Nos concerts"
        id="concerts"
      >
        {lives.map((live) => (
          <Concert key={live.id} concert={live} />
        ))}

      </Section>
    </>
  )
}

export default Concerts;
