import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/Modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";
import Profile from "../../components/Profile/Profile";
import { searchHandler } from "../../store";
import { RESET_SEARCH } from "../../store/actionTypes";

import "./Search.css";

const Option = ({ option, onClickHandler }) => (
  <a className="dropdown-item" onClick={onClickHandler}>
    {option}
  </a>
);

function Search() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      search: state.search,
    };
  });

  const [selectedOption, setSelectedOption] = useState("Movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (searchTerm !== "") {
      const delayDebounceFn = setTimeout(() => {
        dispatch(searchHandler(searchTerm, selectedOption, page));
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setData([]);
      dispatch({ type: RESET_SEARCH });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (state.search.searchData) {
      if (selectedOption === "Movie") {
        setData(state.search.searchData);
      } else {
        setData(state.search.searchData);
      }
    }
  }, [state.search]);

  useEffect(() => {
    if (
      page > 0 &&
      state.search.searchData &&
      state.search.searchData.length > 0
    ) {
      dispatch(searchHandler(searchTerm, selectedOption, page));
    }
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_SEARCH });
      setData([]);
    };
  }, []);

  const selectHandler = (title) => {
    setSelectedOption(title);
    setSearchTerm("");
    dispatch({ type: RESET_SEARCH });
    setData([]);
  };
  const movieCardHandler = (id) => {
    setMovieId(id);
    setMovieModal(true);
  };

  const hideModalhandler = () => {
    setMovieModal(false);
    setMovieId("");
  };

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="f_search">
      <div className="f_search_title text-center">
        <h1>Search</h1>
      </div>
      <div className="f_search_container">
        <div className="f_search_wrapper">
          <div className="f_search_options">
            <p type="button" id="dropdownMenuButton" data-toggle="dropdown">
              <span>{selectedOption}</span>
              <i className="bx bx-chevron-down"></i>
            </p>
            <div
              className="dropdown-menu text-center"
              aria-labelledby="dropdownMenuButton"
            >
              <Option
                option="Movie"
                onClickHandler={() => selectHandler("Movie")}
              />
              <Option
                option="Director"
                onClickHandler={() => selectHandler("Director")}
              />
              <Option
                option="Actor"
                onClickHandler={() => selectHandler("Actor")}
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Search for movie, actor and director"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="f_search_result">
        {selectedOption === "Movie"
          ? data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <MovieCard
                  item={item}
                  setMovieHandler={() => movieCardHandler(item.id)}
                  key={index}
                  styles={{
                    marginTop: "30px",
                  }}
                />
              );
            })
          : selectedOption === "Director"
          ? data &&
            data.length > 0 &&
            data.map((item, index) => (
              <Profile
                title={item.dir_name}
                occupation="Director"
                key={index}
                id={item.id}
              />
            ))
          : selectedOption === "Actor"
          ? data &&
            data.length > 0 &&
            data.map((item, index) => (
              <Profile
                title={item.act_name}
                occupation="Actor"
                key={index}
                id={item.id}
              />
            ))
          : null}
      </div>
      {movieModal && <Modal movieId={movieId} hideModal={hideModalhandler} />}
    </div>
  );
}

export default Search;
