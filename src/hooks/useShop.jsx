// dependencies
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../core/AxiosInstance';

export const ShopContext = createContext();

export function ShopContextProvider({ children }) {
  const [articles, setArticles] = useState([]);

  const BandDatas = async () => {
    try {
      const res = await axiosInstance.get("/api/articles")
      setArticles(res.data['hydra:member'])
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    BandDatas()
  }, [])

  return (
    <ShopContext.Provider
      value={articles}
    >
      {children}
    </ShopContext.Provider>
  )
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}