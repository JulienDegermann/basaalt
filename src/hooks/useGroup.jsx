// dependencies
import PropTypes from 'prop-types';
import axiosInstance from '../core/AxiosInstance';
import { createContext, useEffect, useState } from 'react';

export const GroupContext = createContext();

export function GroupContextProvider({ children }) {
  const [bandMembers, setBandMembers] = useState([]);
  const [band, setBand] = useState([])

  const BandDatas = async () => {
    try {
      const res = await axiosInstance.get("/api/bands")
      setBandMembers(res.data['hydra:member'][0].bandMember)
      setBand(res.data['hydra:member'][0])
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    BandDatas()
  }, [])

  return (
    <GroupContext.Provider
      value={{ bandMembers, band }}
    >
      {children}
    </GroupContext.Provider>
  )
}

GroupContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}