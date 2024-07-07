// dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const NetworksContext = createContext();

export function NetworksContextProvider({ children }) {
  const [networks, setNetworks] = useState([]);

  const networksDatas = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/plateforms")
      setNetworks(res.data['hydra:member'])
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    networksDatas()
  }, [])

  return (
    <NetworksContext.Provider
      value={networks}>
      {children}
    </NetworksContext.Provider>
  )
}

NetworksContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}