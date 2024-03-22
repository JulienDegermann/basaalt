import Navbar from "./Navbar";
import Facebook from "../components/svgs/Facebook.jsx";
import YouTube from "../components/svgs/Youtube.jsx";
import Title from "./Title";
import Spotify from "./svgs/Spotify.jsx";
import Instagram from "./svgs/Instagram.jsx";
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
          <div className="social-container">
            <Title text="Nous suivre" />
            <div className="flex justify-around">
              {
                networks.map((network, index) => {
                  return (
                    // make a switch case for the network.name
                    <a className="social-links" key={index} href={network.url}>
                      {network.name === "YouTube" && (<YouTube />)}
                      {network.name === "Deezer" && (<YouTube />)}
                      {network.name === "Spotify" && (<Spotify />)}
                      {network.name === "Facebook" && (<Facebook />)}
                      {network.name === "Instagram" && (<Instagram />)}



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
