import Button from '../components/Button';
import HomeCard from '../components/HomeCard';
import Title from '../components/Title';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/styles/home.css';

function Home({ networks }) {

  const datas = [
    {
      firstName: "Alex",
      role: "Lead vocal / Rythm guitar",
      image: "basaalt.png"
    },
    {
      firstName: "Jérémie",
      role: "Lead guitar",
      image: "basaalt.png"
    },
    {
      firstName: "Antoine",
      role: "Bass guitar / Back vocal",
      image: "basaalt.png"
    },
    {
      firstName: "Thomas",
      role: "Drums",
      image: "basaalt.png"
    },
  ];

  const [videos, setVideos] = useState([]);
  const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UUIglxpOHFAdn3BvORlLZiZw&key=AIzaSyBN_XjaRjYYR5DqxN9JirdiYSVWuMnrqoI';


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
            Né de la rencontre de quatre musiciens expérimentés, percuté par leurs diverses influences, Basaalt est un groupe de Groove Métal Alternatif. Il propose une musique puissante et organique agrémentée de touches électroniques. En résulte une musique épique qui prend tout son sens sur scène.
          </p>

          <div className="flex justify-between align-center">
            <HomeCard
              datas={datas}
            />
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
                    <network.image />
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
