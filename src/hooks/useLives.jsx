
// dependencies
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../core/AxiosInstance';

export const LivesContext = createContext();

export function LivesContextProvider({ children }) {
  const [lives, setLives] = useState([]);

  const livesDatas = async () => {
    try {
      const res = await axiosInstance.get("/api/lives")
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