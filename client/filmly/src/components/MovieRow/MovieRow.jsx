import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import Arrow from "../Arrow/Arrow";

import "./MovieRow.css";

function MovieRow({ title }) {
  return (
    <div className="f_home_movie_container">
      <h1>{title} Movies</h1>
      <div className="f_movie_card_sections">
        <ScrollMenu
          LeftArrow={
            <Arrow className="f_chevron_left" icon="bx-chevron-left" />
          }
          RightArrow={
            <Arrow className="f_chevron_right" icon="bx-chevron-right" />
          }
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="f_movie_card" id="index" key={index}>
              <h5>Vikram</h5>
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
}

export default MovieRow;
