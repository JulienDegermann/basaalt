// styles
import "./styles.css";

// dependencies
import PropTypes from "prop-types";
import { useContext, useMemo, useState, useEffect } from "react";

// contexts
import { SendMessageContext } from "../../hooks/useMessages.jsx";
import { CartContext } from "../../hooks/useCart.jsx";
import { CitiesContext } from "../../hooks/useCities.jsx";

// components
import FormInput from "../FormInput.jsx";

export default function UserForm({ isMessage = true }) {
  const { message, setMessage, messageErrors } = useContext(SendMessageContext);
  const { cart, setCart, cartErrors } = useContext(CartContext);

  // cart.user.city = useMemo(() => { return searchCity }, [setSearchCity]);

  const { cities, searchCity, setSearchCity } = useContext(CitiesContext);


  useEffect(() => {
    const data = cities.find((city) => {
      return `${city.name.toUpperCase()} (${city.zipCode})` == searchCity;
    });

    console.log(data);
    setCart({ ...cart, user: { ...cart.user, city: data } });
  }, [searchCity]);

  const errors = useMemo(
    () => (isMessage ? messageErrors : cartErrors),
    [messageErrors, cartErrors]
  );

  return (
    <>
      <FormInput
        type="text"
        name="firstName"
        label="Prénom"
        placeholder="Ex : John"
        error={errors?.user?.firstName ? errors.user.firstName : ""}
        onChange={(e) => {
          if (isMessage) {
            setMessage({
              ...message,
              user: { ...message.user, firstName: e.target.value },
            });
          } else {
            setCart({
              ...cart,
              user: { ...cart.user, firstName: e.target.value },
            });
          }
        }}
      />
      <FormInput
        type="text"
        name="lastName"
        label="Nom"
        placeholder="Ex : Doe"
        error={errors?.user?.lastName ? errors.user.lastName : ""}
        onChange={(e) => {
          if (isMessage) {
            setMessage({
              ...message,
              user: { ...message.user, lastName: e.target.value },
            });
          } else {
            setCart({
              ...cart,
              user: { ...cart.user, lastName: e.target.value },
            });
          }
        }}
      />
      <FormInput
        type="email"
        name="email"
        label="E-mail"
        error={errors?.user?.email ? errors.user.email : ""}
        placeholder="Ex : john.doe@example.com"
        onChange={(e) => {
          if (isMessage) {
            setMessage({
              ...message,
              user: { ...message.user, email: e.target.value },
            });
          } else {
            setCart({ ...cart, user: { ...cart.user, email: e.target.value } });
          }
        }}
      />
      {!isMessage && (
        <>
          <FormInput
            type="text"
            name="address"
            label="Adresse de facturation"
            error={errors?.user?.address ? errors.user.address : ""}
            placeholder="Ex : 1 avenue des Champs Élysées"
            onChange={(e) =>
              setCart({
                ...cart,
                user: { ...cart.user, address: e.target.value },
              })
            }
          />
          <FormInput
            type="phone"
            name="phone"
            label="Numéro de téléphone"
            error={errors?.user?.phone ? errors.user.phone : ""}
            placeholder="Ex : 06 12 34 56 78"
            onChange={(e) =>
              setCart({
                ...cart,
                user: { ...cart.user, phone: e.target.value },
              })
            }
          />

          {/* chosse city */}
          <label htmlFor="cityValue">Ville</label>
          <input
            list="cities"
            placeholder="Votre ville"
            onChange={(e) => {
              setSearchCity(e.target.value);
              // setCart({
              //   ...cart,
              //   user: { ...cart.user, city: e.target.value },
              // });
            }}
            id={"cityValue"}
            value={searchCity.name}
          />
          <datalist id="cities">
            {cities.map((city, index) => {
              return (
                <option
                  key={index}
                  value={`${city.name.toUpperCase()} (${city.zipCode})`}
                  // value={`${city.name.toUpperCase()} (${city.zipCode.toUpperCase()})`}
                >
                  {/* {city.name.toUpperCase()} ({city.zipCode}) */}
                </option>
              );
            })}
          </datalist>
        </>
      )}

      {isMessage && (
        <FormInput
          type="textarea"
          name="message"
          label="Message"
          placeholder="Écrivez votre message ici"
          error={errors?.text ? errors.text : ""}
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
        />
      )}
    </>
  );
}

UserForm.propTypes = {
  isMessage: PropTypes.bool.isRequired,
};
