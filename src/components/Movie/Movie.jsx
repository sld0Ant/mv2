import React, { Component } from "react";
import { Card, Rate, Tag } from "antd";
import "../../css/Movie.css";

const shortener = (text) =>
  text
    .split(" ")
    .filter((el, i) => i < 25)
    .join(" ") + " ... ";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
export default class Movie extends Component {
  constructor({
    id,
    title,
    genre_ids,
    release_date,
    overview,
    vote_average,
    userScore,
    rate,
    poster_path,
    sessionID,
    handleSave,
  }) {
    super({
      id,
      title,
      genre_ids,
      release_date,
      overview,
      vote_average,
      userScore,
      rate,
      poster_path,
      sessionID,
      handleSave,
    });

    this.state = { userScore: userScore };
    this.genres = genre_ids.map((id) => genres.find((el) => el.id === id).name);
  }
  render() {
    return (
      <Card hoverable className="app__card">
        <header className="app__card-head">
          <div
            className="app__card-pic"
            style={{
              background: `url("https://image.tmdb.org/t/p/w220_and_h330_face/${this.props.poster_path}")`,
              display: this.props.poster_path ? "block" : "none",
            }}
          />
          <div
            className={`app__card-meta ${
              this.props.poster_path ? "" : "left-align"
            }`}
          >
            <div
              className={`app__card-title ${
                this.props.poster_path ? "" : "left-align"
              }`}
            >
              <h2>{this.props.title}</h2>
              <time className="app__card-date">{this.props.release_date}</time>
            </div>
            <div
              className={`app__card-tags ${
                this.props.poster_path ? "" : "left-align"
              }`}
            >
              {[...this.genres.map((el) => <Tag key={el}>{el}</Tag>)]}
            </div>
          </div>
          <div className="app__card-score">{this.props.vote_average}</div>
        </header>
        <article className="app__card-desc">
          <p>{shortener(this.props.overview)}</p>
        </article>
        <Rate
          onChange={(e) => {
            this.props.rate(this.props.id, e, this.props.sessionID);
            this.setState(
              {
                userScore: e,
              },
              () => {
                this.props.handleSave(
                  {
                    ...this.props,
                    userScore: this.state.userScore,
                  },
                  e
                );
              }
            );
          }}
          defaultValue={this.state.userScore}
          count={10}
          allowHalf
          className="app__card-rate"
        />
      </Card>
    );
  }
}
