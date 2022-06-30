import React from "react";
import { useLocalStorage } from "../../hooks";
import { FavoritesContext } from "../index";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (flightNumber) => {
    setFavorites((prevState) => [...prevState, flightNumber]);
  };

  const removeFavorite = (flightNumberToRemove) => {
    setFavorites((prevState) =>
      prevState.filter((flightNumber) => flightNumber !== flightNumberToRemove)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
