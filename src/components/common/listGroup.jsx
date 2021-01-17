import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const {
    items,
    onItemSelect,
    selectedItem,
    textProperty,
    valueProperty,
  } = props;
  // console.log(items);
  console.log(selectedItem);

  return (
    <nav>
      <ul className="list-group">
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

// ListGroup.propTypes = {
//   itemsCount: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   pageSize: PropTypes.number.isRequired,
// };

export default ListGroup;
