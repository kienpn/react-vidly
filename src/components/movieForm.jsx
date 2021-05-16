import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
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

  doSubmit = async () => {
    // call the server
    console.log("Movie Submitted", this.state.data);

    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const moviedId = this.props.match.params.id;
      if (moviedId === "new") return;

      const { data: movie } = await getMovie(moviedId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
    };
  }

  render() {
    const { genres } = this.state;

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
