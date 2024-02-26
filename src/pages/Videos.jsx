import Title from '../components/Title.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios'
import YoutubeCard from '../components/YoutubeCard.jsx';
import '../assets/styles/videos.css';
import FormInput from '../components/FormInput.jsx';

function Videos() {

  const [videos, setVideos] = useState([]);
  const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3000&playlistId=UUIglxpOHFAdn3BvORlLZiZw&key=AIzaSyBN_XjaRjYYR5DqxN9JirdiYSVWuMnrqoI';


  const [sort, setSort] = useState('last');

  const loading = videos.length === 0 ? 'Chargement...' : '';

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setVideos(res.data.items))
      .catch(
        (err) => console.log(err)
      )
  }, [])


  return (
    <>
      <section>

        <div className="container">
          <Title text="Tous nos clips" />

          <FormInput
            type="select"
            name="sort"
            id="video-sort"
            label="Trier :"
            onChange={e => setSort(e.target.value)}
            defaultValue={sort}
          >
            <option
              // selected={sort === "watch_more"}
              value="watch_more"
            >
              les + populaires
            </option>
            <option
              // selected={sort === "last"}
              value="last"
            >
              les + récents
            </option>
          </FormInput>

          {loading && (<div><h1>{loading}</h1> <br /> </div>)}
          <div className="grid">
            {
              videos.map((video, index) => (
              <YoutubeCard key={index} video={video} />
            ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Videos;
