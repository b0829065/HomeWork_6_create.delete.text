import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">秀出 </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> 表</span>
    </button>
  );
}

export default FilterButton;