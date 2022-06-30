import React from "react";
import { Link } from "react-router-dom";
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";

import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavoriteStar from "./favorite-star";
import SearchInput from "./search-input";
import SelectFilter from "./select-filter";

export default function Launches({
  data,
  error,
  isValidating,
  setSize,
  size,
  pageSize,
  setSearch,
  setFlightSuccessFilter,
}) {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launches" }]} />
      <Flex justify="space-evenly">
        <SelectFilter label="Success Filter" options={["all", "success", "fail"]} onChange={setFlightSuccessFilter} />
        <SearchInput onChange={setSearch} />
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />)}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={pageSize}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchItem({ launch, variant = "", shouldShowFav = true }) {
  const isMini = variant === "mini";

  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={isMini ? "100px" : ["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition={isMini ? "center" : "bottom"}
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {launch.mission_name}
        </Box>
        <Flex justify="space-between">
          <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_utc)}
            </Text>
          </Flex>
          {shouldShowFav && <FavoriteStar launch={launch} />}
        </Flex>
      </Box>
    </Box>
  );
}
