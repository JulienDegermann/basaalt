// styles
import './styles.css'

// dependencies
import PropTypes from 'prop-types';

// contexts
import { useContext } from "react";
import { NetworksContext } from "../../hooks/useNetworks";

// components
import Navbar from "../Navbar";
import NetworkIcons from "../../core/NetworkIcons";
import { NavLink } from 'react-router-dom';

export default function Footer() {

  const networks = useContext(NetworksContext);

  return (
    <footer id='footer'>
      <div className='container'
      >
        <div className="flex justify-between">
          <div>
            <h3 className="sectionTitle">Informations légales</h3>
          </div>
          <div>
            <h3 className="sectionTitle">Plan du site</h3>
            <Navbar />

          </div>
          <div className="social-container">
            <h3 className="sectionTitle">Nous suivre</h3>
            <div className="flex">
              {
                networks.map((network, index) => {
                  // if network's url is set in backoffice : display the icon
                  if (network.url !== null && network.url !== "" && network.url !== undefined) {
                    return (
                      // make a switch case for the network.name
                      <a className="social-links" key={index} href={network.url}>
                        <NetworkIcons network={network} />
                      </a>
                    )
                  }
                })}
            </div>
            <NavLink to="/contact">
              <button
                className="CTA"
                onClick={() => { window.scrollTo(0, 0) }}
              >
                Nous contacter
              </button>
            </NavLink>
          </div>
        </div>

      </div>


    </footer>
  )
}

Footer.propTypes = {
  networks: PropTypes.array
}
