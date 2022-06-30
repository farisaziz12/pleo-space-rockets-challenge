import React from "react";
import { Star } from "react-feather";
import { useFavoritesContext } from "../hooks";

export default function FavoriteStar({ launch }) {
  const { flight_number: flightNumber } = launch;
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
  const isInFavorites = favorites.some((launch) => launch.flight_number === flightNumber);

  const handleClick = (event) => {
    event.preventDefault(); // prevent click event from bubbling up to the link

    if (isInFavorites) {
      removeFavorite(flightNumber);
    } else {
      addFavorite(launch);
    }
  };

  return (
    <button onClick={handleClick}>
      <Star color={isInFavorites ? "#EEBC1D" : "currentColor"} />
    </button>
  );
}
