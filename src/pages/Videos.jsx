import Title from '../components/Title.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios'
import YoutubeCard from '../components/YoutubeCard.jsx';
import '../assets/styles/videos.css';

function Videos() {

  const [videos, setVideos] = useState([]);
  const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3000&playlistId=UUIglxpOHFAdn3BvORlLZiZw&key=AIzaSyBN_XjaRjYYR5DqxN9JirdiYSVWuMnrqoI';

  const loading = videos.length === 0 ? 'Chargement...' : '';

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setVideos(res.data.items))
      .catch(
        (err) => console.log(err)
      )
  }, [])
  console.log(videos);
  return (
    <>
      <div className="container">
        <Title text="Vidéos YouTube" />

        <h2>Liste des dernières vidéos</h2>
        {loading && (<div><h1>{loading}</h1> <br /> </div>)}
        <div className="grid">
          {videos.map((video, index) => (
            <YoutubeCard key={index} video={video} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Videos;
