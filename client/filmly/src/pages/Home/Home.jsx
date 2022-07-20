import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Play from "../../assets/svg/play.svg";
import Info from "../../assets/svg/info.svg";
import Button from "../../components/Button/Button";
import MovieRow from "../../components/MovieRow/MovieRow";
import { getTopMoviesOfTop } from "../../store";
import Modal from "../../components/Modal/Modal";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  const { home, auth } = useSelector((state) => {
    return {
      home: state.home,
      auth: state.auth,
    };
  });

  const [movieData, setMovieData] = useState({});
  const [genres, setGenres] = useState("");
  const [movieModal, setMovieModal] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (home.homeData && home.homeData.length === 0) {
        dispatch(getTopMoviesOfTop());
      } else {
        setMovieData(home.homeData.movie[0]);
        setGenres({
          ...genres,
          genre1: home.homeData.genre1[0],
          genre2: home.homeData.genre2[0],
          genre3: home.homeData.genre3[0],
        });
      }
    }
  }, [home, auth]);

  return (
    <div className="f_home_cotainer">
      {movieData && (
        <div
          className="f_home_header"
          style={{
            backgroundImage: ` linear-gradient(
          -90deg,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.8)
        ),
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
        url("${movieData.mov_img}")`,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <h1>{movieData.mov_title}</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
                iusto illum modi, doloremque, mollitia quo odio non dolorem
                suscipit perspiciatis reiciendis ipsam in fugit deleniti nihil
                inventore nemo. Magni quos, unde rem ab velit quibusdam eum,
                voluptas ut odio praesentium fuga impedit corporis animi
                doloremque perspiciatis, dolores libero laboriosam sit! Odio,
                quae! Nisi libero quos magnam eligendi ea dignissimos at
                architecto, totam quia voluptates facere explicabo. Cumque
                magnam sunt unde?
              </p>
              <div className="f_home_banner_buttons">
                <Button type={"f_btn_pri"} icon={Play} title="Play" />
                <Button
                  type={"f_btn_sec"}
                  icon={Info}
                  title="Info"
                  onClickHandler={() => setMovieModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {genres && (
        <>
          <MovieRow movieList={genres.genre1} />
          <MovieRow movieList={genres.genre2} />
          <MovieRow movieList={genres.genre3} />
        </>
      )}

      {movieModal && (
        <Modal movieId={movieData.id} hideModal={() => setMovieModal(false)} />
      )}
    </div>
  );
}

export default Home;
