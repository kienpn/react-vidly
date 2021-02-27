import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Select from "./common/select";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "", genreId: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(5)
      .required()
      .label("Daily Rental Rate"),
  };

  doSubmit = () => {
    // call the server
    console.log("Movie Submitted", this.state.data);

    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  componentDidMount() {
    let cbbOptions = {};
    const genres = [...getGenres()];
    this.setState({ genres });

    const { match } = this.props;
    const moviedId = match.params.id;
    if (moviedId === "new") return;
    const movie = getMovie(moviedId);
    if (!movie) return this.props.history.replace("/not-found");

    const data = {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
    };
    this.setState({ data });
  }

  render() {
    const { data, errors, genres } = this.state;

    return (
      <div>
        <h1>Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}

          {this.renderSelect("Genre", "genreId", genres)}

          {this.renderInput("Number in Stock", "numberInStock")}
          {this.renderInput("Rate", "dailyRentalRate")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
