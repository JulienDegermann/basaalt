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
import Section from '../../components/Section';

export default function Footer() {

  const networks = useContext(NetworksContext);

  return (
    <footer>
      <Section
        id='footer'
      >
        <div className="flex justify-between">
          <div>
            <h3>Informations légales</h3>
          </div>
          <div>
            <h3>Plan du site</h3>
            <Navbar />

          </div>
          <div className="social-container">
            <h3>Nous suivre</h3>
            <div className="flex justify-around">
              {
                networks.map((network, index) => {
                  return (
                    // make a switch case for the network.name
                    <a className="social-links" key={index} href={network.url}>
                      <NetworkIcons network={network} />
                    </a>
                  )
                })}
            </div>
          </div>
        </div>

      </Section>


    </footer>
  )
}

Footer.propTypes = {
  networks: PropTypes.array
}
