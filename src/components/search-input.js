import React from "react";
import { Flex, Input } from "@chakra-ui/core";

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const SearchInput = ({ onChange, ...props }) => {
  const debouncedSearch = debounce(onChange, 750);

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <Flex justifyContent="center">
      <Input
        width="300px"
        onChange={handleChange}
        placeholder="Search for a rocket name..."
        {...props}
      />
    </Flex>
  );
};

export default SearchInput;
