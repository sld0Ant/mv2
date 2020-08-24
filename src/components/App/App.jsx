import React, { Component } from "react";
import { Tabs, Input, Pagination } from "antd";
import Movie from "../Movie";
import "../../css/App.css";
import { debRate, auth, debSearch } from "../../js/tmdb";
import { union } from "lodash";
const { TabPane } = Tabs;
const { Search } = Input;

const fakeMovie = Array(20).fill({
  id: 1,
  title: "Mohave Ridge",
  genres: ["Sci-Fi", "Western", "Drama", "Adventure"],
  date: "10-01-1921",
  desc:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elt. Quisquam facere laborum, unde, obcaecati mollitia sint nesciunt, atque sed labore officiis doloremque ipsa? Temporibus cum voluptates dignissimos fugiat voluptatum repellendus eaque.",
  score: 7.9,
  userScore: 0,
  poster:
    "https://images-na.ssl-images-amazon.com/images/I/71rNJQ2g-EL._AC_SL1178_.jpg",
  rate: debRate,
});
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
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
            el.id === movie.id
              ? { ...movie, userRate: movie.userRate }
              : { ...el }
          )
        : [...prev.userRated, movie];
      console.log(newRated);
      return {
        ...prev,
        userRated: newRated,
      };
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Movies App</h1>
          <Search
            className="app__search"
            defaultValue={this.state.search}
            onChange={(e) => {
              debSearch(
                e.target.value,
                this.state.page,
                this.setState.bind(this)
              );
            }}
          />
        </header>
        <main className="app__main">
          <Tabs centered defaultActiveKey="1">
            <TabPane className="app__tab" tab="Lookup" key="1">
              <div className="app__card-container">
                {this.state.sessionID &&
                  this.state.movies &&
                  this.state.movies.map((el) => (
                    <Movie
                      key={el.id}
                      {...{
                        id: el.id,
                        title: el.title,
                        overview: el.overview,
                        release_date: el.release_date,
                        poster_path: el.poster_path,
                        genre_ids: el.genre_ids,
                        vote_average: el.vote_average,
                        sessionID: this.state.sessionID,
                        handleSave: this.handleSave,
                        userScore: 0,
                        rate: debRate,
                      }}
                    />
                  ))}
                <Pagination
                  defaultCurrent={this.state.page}
                  total={this.state.totalResults}
                  onChange={(e) =>
                    debSearch(this.state.search, e, this.setState.bind(this))
                  }
                />
              </div>
            </TabPane>
            <TabPane className="app__tab" tab="Rated" key="2">
              <div className="app__card-container">
                {this.state.userRated &&
                  this.state.userRated.map((el) => {
                    console.log(el);

                    return <Movie {...el} />;
                  })}
              </div>
            </TabPane>
          </Tabs>
        </main>
        <footer className="app__footer"></footer>
      </div>
    );
  }
}
