import React from "react";
import { useHistory } from "react-router";

import "./NavItem.css";

const NavItem = ({ name, isDropDown, route, genresList }) => {
  const history = useHistory();
  
  return isDropDown ? (
    <li className="nav-item">
      <p type="button" id="dropdownMenuButton" data-toggle="dropdown">
        All Genres
      </p>
      <div
        className="dropdown-menu text-center"
        aria-labelledby="dropdownMenuButton"
      >
        {genresList.map(({ id, gen_title }, index) => (
          <a
            className="dropdown-item"
            key={index}
            onClick={() => history.push(`/genre/${gen_title}`)}
          >
            {gen_title}
          </a>
        ))}
      </div>
    </li>
  ) : (
    <li
      className="nav-item"
      onClick={() => history.push(route === "home" ? "/" : `/${route}`)}
    >
      <p>{name}</p>
    </li>
  );
};

export default NavItem;
