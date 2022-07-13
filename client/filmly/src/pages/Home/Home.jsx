import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import Play from "../../assets/svg/play.svg";
import Info from "../../assets/svg/info.svg";
import Button from "../../components/Button/Button";

import "./Home.css";
import MovieRow from "../../components/MovieRow/MovieRow";
import { getTopMoviesOfTop, validateToken } from "../../store";

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      history.push("/signin");
      dispatch({ type: "LOGOUT" });
    } else {
      dispatch(validateToken());
    }
  }, []);

  useEffect(() => {
    dispatch(getTopMoviesOfTop());
  }, []);
  return (
    <div className="f_home_cotainer">
      <div className="f_home_header">
        <div className="row">
          <div className="col-md-6">
            <h1>Jana Gana Mana</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
              iusto illum modi, doloremque, mollitia quo odio non dolorem
              suscipit perspiciatis reiciendis ipsam in fugit deleniti nihil
              inventore nemo. Magni quos, unde rem ab velit quibusdam eum,
              voluptas ut odio praesentium fuga impedit corporis animi
              doloremque perspiciatis, dolores libero laboriosam sit! Odio,
              quae! Nisi libero quos magnam eligendi ea dignissimos at
              architecto, totam quia voluptates facere explicabo. Cumque magnam
              sunt unde?
            </p>
            <div className="f_home_banner_buttons">
              <Button type={"f_btn_pri"} icon={Play} title="Play" />
              <Button type={"f_btn_sec"} icon={Info} title="Info" />
            </div>
          </div>
        </div>
      </div>

      <MovieRow title="Action" />
      <MovieRow title="Comedy" />
    </div>
  );
}

export default Home;
