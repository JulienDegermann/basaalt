// dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const YoutubeContext = createContext();

export function YoutubeContextProvider({ children }) {
  const [videos, setVideos] = useState([]);

  const YoutubeDatas = async () => {
    try {
      const res = await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=UUIglxpOHFAdn3BvORlLZiZw&key=AIzaSyBN_XjaRjYYR5DqxN9JirdiYSVWuMnrqoI")
      setVideos(res.data.items)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    YoutubeDatas()
  }, [])

  return (
    <YoutubeContext.Provider
      value={videos}
    >
      {children}
    </YoutubeContext.Provider>
  )
}

YoutubeContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}