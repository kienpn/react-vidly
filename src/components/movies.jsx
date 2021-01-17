import React, { Component } from "react";

import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    // currentGenre: genres[0],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    const selectedGenre = genres[0];
    this.setState({ genres, movies: getMovies(), selectedGenre });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      genres,
      movies: allMovies,
      pageSize,
      selectedGenre,
    } = this.state;

    if (count === 0) {
      return (
        <span className="badge badge-warning">
          There are no movies in the database.
        </span>
      );
    }

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    console.log("filterdMovies", filteredMovies);
    const movies = paginate(filteredMovies, currentPage, pageSize);
    console.log("movies", movies);

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <div>
              <span className="badge badge-primary">
                Showing {filteredMovies.length} movies in the database.
              </span>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Rate</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <th scope="row">{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          onClick={() => this.handleLike(movie)}
                          checked={movie.liked}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                itemsCount={filteredMovies.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
