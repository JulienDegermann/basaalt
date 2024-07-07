
// dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const LivesContext = createContext();

export function LivesContextProvider({ children }) {
  const [lives, setLives] = useState([]);

  const livesDatas = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/lives")
      setLives(res.data['hydra:member'])
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    livesDatas()
  }, [])

  return (
    <LivesContext.Provider
      value={lives}
    >
      {children}
    </LivesContext.Provider>
  )
}

LivesContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}