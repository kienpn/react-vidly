import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const {
    items,
    onItemSelect,
    selectedItem,
    textProperty,
    valueProperty,
  } = props;

  return (
    <nav>
      <ul className="list-group clickable">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={
              selectedItem === item
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </nav>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.any.isRequired,

  // itemsCount: PropTypes.number.isRequired,
  // onPageChange: PropTypes.func.isRequired,
  // currentPage: PropTypes.number.isRequired,
  // pageSize: PropTypes.number.isRequired,
};

export default ListGroup;
