import Navbar from "./Navbar";
import Facebook from "../components/svgs/Facebook.jsx";
import YouTube from "../components/svgs/Youtube.jsx";
import Title from "./Title";
import Spotify from "./svgs/Spotify";
import Instagram from "./svgs/Instagram";
import Soundcloud from "./svgs/Soundcloud";
import PropTypes from 'prop-types';





export default function Footer({ networks }) {

  // find a way to dynamically render svgs
  const newNetworks = [];
  networks.map((network) => {
    newNetworks[network.name] = {
      id: network.id,
      name: network.name,
      url: network.url,
      logo: <network.name />
    }
  })


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
                      {network.name === "Soundcloud" && (<Soundcloud />)}



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
