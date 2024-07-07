// dependencies
import PropTypes from 'prop-types';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

export function ShopContextProvider({ children }) {
  const [articles, setArticles] = useState([]);

  const BandDatas = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/articles")
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