import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Modal from "../../components/Modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";
import {
  getAllMoviesOfActor,
  getAllMoviesOfDirector,
} from "../../store/actions/home";

import "./List.css";

function List() {
  const { id, occupation } = useParams();
  const dispatch = useDispatch();
  const { home } = useSelector((state) => {
    return {
      home: state.home,
    };
  });

  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState("");

  useEffect(() => {
    if (occupation === "actor") {
      dispatch(getAllMoviesOfActor(id));
    } else {
      dispatch(getAllMoviesOfDirector(id));
    }
  }, [id]);

  useEffect(() => {
    if (home.allMoviesOfActor && home.allMoviesOfActor.length > 0) {
      setData(home.allMoviesOfActor[0].movies);
      setName(
        home.allMoviesOfActor[0][
          occupation === "actor" ? "act_name" : "dir_name"
        ]
      );
      console.log(home.allMoviesOfActor);
    }
  }, [home]);

  const movieCardHandler = (id) => {
    setMovieId(id);
    setMovieModal(true);
  };

  const hideModalhandler = () => {
    setMovieModal(false);
    setMovieId("");
  };

  return (
    data && (
      <div className="f_list">
        <div className="f_list_title text-center">
          <h1>{name}</h1>
        </div>
        <div className="row">
          {data &&
            data.map((item, index) => (
              <MovieCard
                item={item}
                setMovieHandler={() => movieCardHandler(item.id)}
                key={index}
              />
            ))}
        </div>
        {movieModal && <Modal movieId={movieId} hideModal={hideModalhandler} />}
      </div>
    )
  );
}

export default List;
