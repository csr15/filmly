import React from "react";
import { useHistory } from "react-router";

import "./Button.css";

const Button = ({ type, icon, title, onClickHandler, styles }) => {
  const history = useHistory();

  return (
    <button
      className={`${type}`}
      onClick={onClickHandler ? onClickHandler : () => history.push("/video")}
      style={styles}
    >
      {icon && (
        <span>
          <img src={icon} alt="Filmly" />
        </span>
      )}
      {title}
    </button>
  );
};

export default Button;
