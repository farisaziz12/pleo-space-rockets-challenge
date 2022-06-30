import React from "react";
import { Select } from "@chakra-ui/core";

const SelectFilter = ({ label, options, onChange, ...props }) => {
  const renderOptions = () =>
    options.map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });

  return (
    <div>
      {label && <label style={{ fontSize: "15px" }}>{label}</label>}
      <Select onChange={(e) => onChange(e.target.value)} width="150px" {...props}>
        {renderOptions()}
      </Select>
    </div>
  );
};

export default SelectFilter;
