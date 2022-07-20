import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import Arrow from "../Arrow/Arrow";
import Modal from "../Modal/Modal";
import MovieCard from "../MovieCard/MovieCard";

import "./MovieRow.css";

function MovieRow({ movieList }) {
  const { gen_title, movies } = movieList;

  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState("");

  const movieCardHandler = (id) => {
    setMovieId(id);
    setMovieModal(true);
  };

  const hideModalhandler = () => {
    setMovieModal(false);
    setMovieId("");
  };

  return (
    <div className="f_home_movie_container">
      <h1>{gen_title} Movies</h1>
      <div className="f_movie_card_sections">
        <ScrollMenu
          LeftArrow={
            <Arrow
              className="f_chevron_left"
              icon="bx-chevron-left"
              styles={
                movies.length > 5 ? { display: "flex" } : { display: "none" }
              }
            />
          }
          RightArrow={
            <Arrow
              className="f_chevron_right"
              icon="bx-chevron-right"
              styles={
                movies.length > 5 ? { display: "flex" } : { display: "none" }
              }
            />
          }
        >
          {movies.map((item, index) => (
            <MovieCard
              item={item}
              setMovieHandler={() => movieCardHandler(item.id)}
              key={index}
            />
          ))}
        </ScrollMenu>
      </div>
      {movieModal && (
        <Modal movieId={movieId} hideModal={hideModalhandler} />
      )}
    </div>
  );
}

export default MovieRow;
