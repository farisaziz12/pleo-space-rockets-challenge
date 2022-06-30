import React from "react";
import { XCircle } from "react-feather";
import styled from "@emotion/styled";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
} from "@chakra-ui/core";
import { useFavoritesContext } from "../hooks";
import { LaunchItem } from "./launches";

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -20px;
  cursor: pointer;
`;

export default function FavoritesDrawer({launches, ...props}) {
  const { favorites, removeFavorite } = useFavoritesContext();

  const renderLaunchItems = () => {
    if (!favorites.length) return null;

    return favorites.map((flightNumber) => {
      return (
        <React.Fragment key={flightNumber}>
          <XContainer>
            <XCircle onClick={() => removeFavorite(flightNumber)} color="red" />
          </XContainer>
          <LaunchItem
            variant="mini"
            launch={launches?.find((launch) => launch.flight_number === flightNumber)}
            shouldShowFav={false}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <Drawer size="sm" placement="right" {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Favorites</DrawerHeader>
        <DrawerBody>
          <Text fontWeight="bold" fontSize="lg">
            Launches ({favorites.length})
          </Text>
          {renderLaunchItems()}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
