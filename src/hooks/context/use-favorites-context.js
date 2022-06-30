import { useContext } from "react";
import { FavoritesContext } from "../../contexts";

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavoritesContext was used outside of its Provider");
  }

  return context;
};