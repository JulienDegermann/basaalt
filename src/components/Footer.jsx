import Navbar from "./Navbar";
import Facebook from "../components/svgs/Facebook.jsx";
import YouTube from "../components/svgs/Youtube.jsx";
import Title from "./Title";
import Spotify from "./svgs/Spotify.jsx";
import PropTypes from 'prop-types';



export default function Footer({ networks }) {
  return (
    <footer>
      <div className="container">
        <div className="flex justify-between">
          <div>

            <Title text="Informations légales" />
          </div>
          <div>
            <Title text="Plan du site" />
            <Navbar />

          </div>
          <div>
            <Title text="Nous suivre" />
            <div className="flex justify-around">
            {
              networks.map((network, index) => {
                return (
                  <a className="social-links" key={index} href={network.url}>
                    <network.image />
                  </a>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  networks: PropTypes.array
}
