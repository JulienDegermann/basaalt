import Button from '../components/Button';
import HomeCard from '../components/HomeCard';
import Title from '../components/Title';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/styles/home.css';

function Home({ networks }) {

  const [bandMembers, setBandMembers] = useState([]);
  const [band, setBand] = useState([]);

  const [albums,  setAlbums] = useState([]);



  const [videos, setVideos] = useState([]);
  
  
  useEffect(() => {
    const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UUIglxpOHFAdn3BvORlLZiZw&key=AIzaSyBN_XjaRjYYR5DqxN9JirdiYSVWuMnrqoI';
    axios
      .get(url)
      .then(res => setVideos(res.data.items))
      .catch(
        err => console.log(err)
      );

    axios
      .get("https://127.0.0.1:8000/api/songs")
      .then(res => { 
        console.log(res.data)
        // setAlbums(res.data['hydra:member'][0]) 
      })
      .catch(e => console.log(e));

    axios
      .get("https://127.0.0.1:8000/api/bands")
      .then(res => { 
        setBand(res.data['hydra:member'][0]) 
        setBandMembers(res.data['hydra:member'][0].bandMember)
      })
      .catch(e => console.log(e));

  }, [])

  console.log(albums);
  return (
    <>
      <section id="heroBanner">
        <img
          src="images/basaalt.png"
          alt="logo du groupe Basaalt"
          title="logo du groupe Basaalt"
        />

        <Title leve="2" text="Groove métal atlernatif" />

        <NavLink to="/nos-clips" className={nav => nav.isActive ? "active" : ""}>
          <Button
            className='CTA'
            text='tous nos clips'
          />
        </NavLink>

      </section>

      <section>
        <div className="container">

          <Title text="Le groupe" />

          <p>
            {band.description}
          </p>



          <div className="flex justify-between align-center">
            {
              bandMembers.map((bandMember, index) => {
                return (
                  <HomeCard
                    firstName={bandMember.firstName}
                    role={bandMember.bandRole}
                    image="basaalt.png"
                    key={index}
                  />
                )

              })
            }
          </div>

        </div>
      </section>

      <section>
        <div className="container social-container">

          <Title text="Nous suivre" />

          <p>
            Réseaux sociaux, plateformes d’écoutes ou encore YouTube, n’hésitez pas à nous suivre sur les réseaux pour ne rien manquer ! 🤘
          </p>
          <div className="flex justify-around align-center ">
            {
              networks.map((network, index) => {
                return (
                  <a className="social-links" key={index} href={network.url}>
                    {/* <network.image /> */}
                  </a>
                )
              })}
          </div>
          <div id="youtube-player">
            {/* errors in logs */}
            {/* {
              videos.map((video, index) => (
                <iframe key={index} src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`} allowFullScreen title="Youtube Video"></iframe>
              ))
            } */}
          </div>



        </div>
      </section>
    </>
  )
}

export default Home;


Home.propTypes = {
  networks: PropTypes.array
}
