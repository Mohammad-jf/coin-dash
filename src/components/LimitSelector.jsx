import React from "react";

const LimitSelector = ({ limit, setLimit }) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show</label>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        id="limit"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
