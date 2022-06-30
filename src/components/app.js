import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesDrawer from "./favorites-drawer";
import { FavoritesProvider } from "../contexts";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <NavBar openDrawer={() => setIsDrawerOpen(true)} />
      <FavoritesProvider>
        <FavoritesDrawer onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launches/:launchId" element={<Launch />} />
          <Route path="/launch-pads" element={<LaunchPads />} />
          <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
        </Routes>
      </FavoritesProvider>
    </>
  );
}

function NavBar({ openDrawer }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
        ¡SPACE·R0CKETS!
      </Text>
      <Button onClick={openDrawer} color="black" fontWeight="bold" fontSize="sm">
        Favorites
      </Button>
    </Flex>
  );
}
