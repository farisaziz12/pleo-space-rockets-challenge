import React from "react";
import { useLocalStorage } from "../../hooks";
import { FavoritesContext } from "../index";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (launch) => {
    setFavorites((prevState) => [...prevState, launch]);
  };

  const removeFavorite = (flightNumber) => {
    setFavorites((prevState) =>
      prevState.filter((launch) => launch.flight_number !== flightNumber)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
