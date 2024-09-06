// dependencies
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../core/AxiosInstance';

export const SongsContext = createContext();

export function SongsContextProvider({ children }) {
  const [songs, setSongs] = useState([]);

  const SongsDatas = async () => {
    try {
      const res = await axiosInstance.get("/api/songs")
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