import React from "react";

import "./MovieCard.css";

function MovieCard({ item, setMovieHandler, width, height }) {
  return (
    <div
      className="f_movie_card"
      id="index"
      onClick={setMovieHandler}
      style={{
        backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${item.mov_img})
    `,
        width: width ? width : "300px",
        height: height ? height : "150px",
      }}
    >
      <h5>{item.mov_title}</h5>
    </div>
  );
}

export default MovieCard;
