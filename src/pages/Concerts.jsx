// dependecies
import { useContext, useMemo, useState } from 'react';

// contexts
import { LivesContext } from '../hooks/useLives';

// components
import Section from '../components/Section';
import LiveCard from '../components/LiveCard';

function Concerts() {

  const lives = useContext(LivesContext)
  const defaultAddress = useMemo(() => lives[0] ? lives[0].address : 'chargement en cours', [lives])
  const [address, setAddress] = useState('')



  // change address to include map iframe => look for google map api
  const handleChangeAddress = (address) => {
    const addressParam = new URLSearchParams(address)
    setAddress(address)
  }

  return (
    <>
      <Section
        title="Nos concerts"
        id="concerts"
      >
        {lives.map(live => (
          <LiveCard
            key={live.id}
            concert={live}
          // onClick={handleChangeAddress}
          />
        ))}
      </Section>
    </>
  )
}

export default Concerts;
