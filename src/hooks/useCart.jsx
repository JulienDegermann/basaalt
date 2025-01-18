// dependencies
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Regex from "/src/core/Regex";

import AxiosInstance from "../core/AxiosInstance.js";
import { findUserByEmail, findCity } from "../core/GlobalMethods.js";
import { ModalContext } from "./useModal.jsx";

// components
// svgs
// contexts
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const { modals, setModals } = useContext(ModalContext);

  const initialCart = () => {
    const storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage) : {};
  };

  const [cart, setCart] = useState(initialCart);
  
  useEffect(() => {
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const data = async () => {
      const response = await AxiosInstance.get("/session/get");
      console.log(response.data);
    };
    try {
      data();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [cartErrors, setCartErrors] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
    },
    order: "",
  });

  const cartCount = useMemo(() => {
    if (cart?.articleCommands?.length === 0) {
      return 0;
    }
    return cart?.articleCommands?.reduce(
      (count, articleCommand) => count + articleCommand.quantity,
      0
    );
  }, [cart]);

  const updateSession = async (newCart) => {
    console.log(newCart);
    try {
      const res = await AxiosInstance.post(
        "/session/update",
        { cart: newCart },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = (e) => {
    const articleIndex = cart?.articleCommands?.findIndex(
      (item) => item.stock.id === e.stock.id
    );
    const newCart = { ...cart };
    console.log(cart);
    if (articleIndex >= 0) {
      const prevQuantity = parseInt(
        newCart.articleCommands[articleIndex].quantity
      );
      const stockQuantity =
        newCart.articleCommands[articleIndex].stock.quantity;
      if (prevQuantity + e.quantity <= stockQuantity) {
        newCart.articleCommands[articleIndex].quantity =
          prevQuantity + e.quantity;
      }
    } else {
      if (!Array.isArray(newCart.articleCommands)) {
        newCart.articleCommands = [];
      }
      newCart.articleCommands.push(e);
    }
    newCart.satus = "saved";

    return setCart(newCart);
  };

  const sendOrder = async () => {
    // define buyer
    const user = await findUserByEmail(cart.user);
    // const city = await findCity(cart.buyer.city);
    const buyer = user ? user : cart.user;
    buyer.city = user?.city ? user?.city["@id"] : cart.user.city["@id"];
    cart.buyer = buyer;
    cart.status = "paymentValid";

    const verifyDatas = (cart) => {
      const errReg = { ...cartErrors };
      // foreach input, check if there is an error message -> if yes, display it
      errReg.user.firstName = Regex({
        value: cart.user?.firstName,
        type: "name",
        fieldName: "Prénom",
      });
      errReg.user.lastName = Regex({
        value: cart.user?.lastName,
        type: "name",
        fieldName: "Nom",
      });
      errReg.user.email = Regex({
        value: cart.user?.email,
        type: "email",
        fieldName: "E-mail",
      });
      errReg.user.address = Regex({
        value: cart.user?.address,
        type: "address",
        fieldName: "Adresse",
      });
      errReg.user.phone = Regex({
        value: cart.user?.phone,
        type: "phone",
        fieldName: "Numéro de téléphone",
      });
      // errReg.text = Regex({value: .text, type: 'text', fieldName: 'Message'});
      setCartErrors(errReg);
      if (errReg.user.firstName || errReg.user.lastName || errReg.user.email) {
        return true;
      }
    };

    if (verifyDatas(cart)) {
      return;
    }

    try {
      const response = await new AxiosInstance.post("/api/orders", cart, {
        headers: { "Content-Type": "application/ld+json" },
      });

      if (response.status === 201) {
        setCart({});
        setModals([
          ...modals,
          {
            type: "success",
            text: "Votre commande a bien été envoyée",
          },
        ]);
      }
      // if (response.status 201 ): ok -> reset cart
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, sendOrder, cartCount, cartErrors }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
