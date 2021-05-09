import React from "react";

const SearchBox = (props) => {
  const { value, onChange } = props;

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control my-3"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
