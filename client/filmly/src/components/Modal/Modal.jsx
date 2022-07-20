import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import Button from "../Button/Button";
import Play from "../../assets/svg/play.svg";
import Backdrop from "../Backdrop/Backdrop";
import { getMovieDetails } from "../../store/actions/home";

import "./Modal.css";

const SpanName = ({ name, onClick, hideModal }) => (
  <span
    onClick={() => {
      hideModal();
      onClick();
    }}
  >
    {name},
  </span>
);

function Modal({ hideModal, movieId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => {
    return {
      home: state.home,
    };
  });

  const [movieDetails, setMovieDetails] = useState("");

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, []);

  useEffect(() => {
    if (state.home.movieDetails !== "") {
      setMovieDetails({
        genre: state.home.movieDetails.genre[0].genres,
        director: state.home.movieDetails.director[0],
        cast: state.home.movieDetails.cast[0].actors,
      });
    }
  }, [state.home.movieDetails]);

  return (
    movieDetails !== "" && (
      <Backdrop>
        <div
          className="f_modal_body"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
         url(${movieDetails.director.mov_img})`,
          }}
        >
          <h1 className="f_title">{movieDetails.director.mov_title}</h1>
          <Button type={"f_btn_pri"} icon={Play} title="Play" />
          <div className="f_modal_close" onClick={hideModal}>
            <i className="bx bx-x-circle"></i>
          </div>
        </div>
        <div className="f_modal_footer">
          <div className="f_footer_left">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quae unde voluptatibus, ut nam fugit! Exercitationem tempore natus
              quaerat itaque consequuntur dignissimos voluptatum consectetur
              suscipit reiciendis ullam tenetur, magnam facilis laudantium ipsa
              minus.
            </p>
          </div>
          <div className="f_footer_right">
            <div>
              <div className="f_footer_details">
                <span className="f_footer_detail_title">Cast: </span>
                {movieDetails.cast.map((item, index) => {
                  return (
                    <SpanName
                      name={item.act_name}
                      key={index}
                      index={index}
                      onClick={() => history.push(`/list/actor/${item.id}`)}
                      hideModal={hideModal}
                    />
                  );
                })}
              </div>
              <div className="f_footer_details">
                <span className="f_footer_detail_title">Director: </span>
                {movieDetails.director.directors.map((item, index) => {
                  return (
                    <SpanName
                      name={item.dir_name}
                      key={index}
                      index={index}
                      onClick={() => history.push(`/list/director/${item.id}`)}
                      hideModal={hideModal}
                    />
                  );
                })}{" "}
              </div>
              <div className="f_footer_details">
                <span className="f_footer_detail_title">Genres: </span>
                {movieDetails.genre.map((item, index) => {
                  return (
                    <SpanName
                      name={item.gen_title}
                      key={index}
                      index={index}
                      onClick={() => history.push(`/genre/${item.gen_title}`)}
                      hideModal={hideModal}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Backdrop>
    )
  );
}

export default Modal;
