import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { capitalize } from "../utils/capitalize";
import { FavoritesProvider } from "../contexts";
import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import FavoritesDrawer from "./favorites-drawer";

const PAGE_SIZE = 12;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rocketSearch, setRocketSearch] = useState("");
  const [flightSuccessFilter, setFlightSuccessFilter] = useState("all");
  const isSuccess = flightSuccessFilter === "success";

  const response = useSpaceXPaginated("/launches/past", {
    limit: PAGE_SIZE,
    order: "desc",
    sort: "launch_date_utc",
    rocket_name: capitalize(rocketSearch),
    ...(flightSuccessFilter === "all" ? {} : { launch_success: isSuccess }),
  });
  const { data } = response;

  const handleSearch = (value) => {
    setRocketSearch(value);
  };

  return (
    <>
      <NavBar openDrawer={() => setIsDrawerOpen(true)} />
      <FavoritesProvider>
        <FavoritesDrawer
          launches={data?.flat()}
          onClose={() => setIsDrawerOpen(false)}
          isOpen={isDrawerOpen}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/launches"
            element={
              <Launches
                {...response}
                setSearch={handleSearch}
                setFlightSuccessFilter={setFlightSuccessFilter}
                pageSize={PAGE_SIZE}
              />
            }
          />
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
        ??SPACE??R0CKETS!
      </Text>
      <Button onClick={openDrawer} color="black" fontWeight="bold" fontSize="sm">
        Favorites
      </Button>
    </Flex>
  );
}
