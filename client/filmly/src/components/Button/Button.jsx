import React from "react";

const Button = ({ type, icon, title }) => {
  return (
    <button className={`btn ${type}`}>
      <span>
        <img src={icon} alt="Filmly" />
      </span>
      {title}
    </button>
  );
};

export default Button;
