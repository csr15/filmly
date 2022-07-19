import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Modal from "../../components/Modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getAllMoviesOfGenre } from "../../store/actions/genres";

import "./Genre.css";

function Genre() {
  const { genreTitle } = useParams();
  const dispatch = useDispatch();

  const { genre } = useSelector((state) => {
    return {
      genre: state.genre,
    };
  });

  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [movies, setMovies] = useState([]);

  const movieCardHandler = (id) => {
    setMovieId(id);
    setMovieModal(true);
  };

  const hideModalhandler = () => {
    setMovieModal(false);
    setMovieId("");
  };

  useEffect(() => {
    dispatch(getAllMoviesOfGenre(genreTitle));
  }, [genreTitle]);

  useEffect(() => {
    if (genre.allMoviesOfGenre && genre.allMoviesOfGenre.length > 0) {
      setMovies(genre.allMoviesOfGenre[0].movies);
    }
  }, [genre]);

  return (
    <div className="f_genre">
      <div className="f_genre_title text-center">
        <h1>{genreTitle}</h1>
      </div>
      <div className="row">
        {movies.map((item, index) => (
          <MovieCard
            item={item}
            setMovieHandler={() => movieCardHandler(item.id)}
            key={index}
          />
        ))}
      </div>
      {movieModal && <Modal movieId={movieId} hideModal={hideModalhandler} />}
    </div>
  );
}

export default Genre;
