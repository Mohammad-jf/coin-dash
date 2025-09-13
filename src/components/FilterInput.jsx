import React from "react";

const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Filter Coins by Name or Symbol"
      />
    </div>
  );
};

export default FilterInput;
