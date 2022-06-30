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

export default function FavoritesDrawer(props) {
  const { favorites, removeFavorite } = useFavoritesContext();

  const renderLaunchItems = () => {
    if (!favorites.length) return null;

    return favorites.map((launch) => {
      return (
        <React.Fragment key={launch.flight_number}>
          <XContainer>
            <XCircle onClick={() => removeFavorite(launch.flight_number)} color="red" />
          </XContainer>
          <LaunchItem
            variant="mini"
            key={launch.flight_number}
            launch={launch}
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
