// dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const SongsContext = createContext();

export function SongsContextProvider({ children }) {
  const [songs, setSongs] = useState([]);

  const SongsDatas = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/songs")
      setSongs(res.data.items)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    SongsDatas()
  }, [])

  return (
    <SongsContext.Provider
      value={songs}
    >
      {children}
    </SongsContext.Provider>
  )
}

SongsContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}