import React, { Component } from "react";
import { Input, Pagination } from "antd";
import Movie from "../Movie";
import "../../css/App.css";
import { debRate, auth, debSearch } from "../../js/tmdb";

import App from "../App/";

const { Search } = Input;

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      sessionID: null,
      userRated: [],
      page: 1,
      totalPages: null,
      search: null,
    };
    this.handleSave = this.handleSave.bind(this);
  }
  async componentDidMount() {
    this.setState({ sessionID: await auth() });
  }

  handleSave(movie, userScore) {
    this.setState((prev) => {
      const newRated = prev.userRated.find((el) => el.id === movie.id)
        ? prev.userRated.map((el) =>
            el.id === movie.id ? { ...movie, userScore } : { ...el, userScore }
          )
        : [...prev.userRated, { ...movie, userScore }];
      console.log(newRated);
      return {
        ...prev,
        userRated: newRated,
      };
    });
  }

  render() {
    const movies =
      this.state.sessionID &&
      this.state.movies &&
      this.state.movies.map((el, i) => {
        return (
          <Movie
            key={el.id}
            {...{
              ...el,
              userScore: this.state.userRated.find((el) => el.id)?.userScore,
              sessionID: this.state.sessionID,
              handleSave: this.handleSave,
              rate: debRate,
            }}
          />
        );
      });
    const userRated =
      this.state.userRated &&
      this.state.userRated.map((el) => {
        return <Movie key={el.id} {...el} />;
      });
    const pagination = (
      <Pagination
        defaultCurrent={this.state.page}
        total={this.state.totalResults}
        onChange={(e) =>
          debSearch(this.state.search, e, this.setState.bind(this))
        }
      />
    );
    const search = (
      <Search
        className="app__search"
        defaultValue={this.state.search}
        onChange={(e) => {
          debSearch(e.target.value, this.state.page, this.setState.bind(this));
        }}
      />
    );
    return <App {...{ search, movies, pagination, userRated }} />;
  }
}
