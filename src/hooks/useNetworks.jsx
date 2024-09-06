// dependencies
import PropTypes from 'prop-types';

import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../core/AxiosInstance';

export const NetworksContext = createContext();

export function NetworksContextProvider({ children }) {
  const [networks, setNetworks] = useState([]);

  const networksDatas = async () => {
    try {
      const res = await axiosInstance.get("/api/plateforms")
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