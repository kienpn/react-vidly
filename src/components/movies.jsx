import React, { Component } from "react";
import _ from "lodash";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    // currentGenre: genres[0],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: "",
  };

  async componentDidMount() {
    const { data: genresInDb } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genresInDb];
    const selectedGenre = genres[0];

    const { data: movies } = await getMovies();
    this.setState({ genres, movies, selectedGenre });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: "",
      currentPage: 1,
    });
  };

  handleAddMovie = () => {};

  getPagedData = () => {
    const {
      currentPage,
      movies: allMovies,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter((m) =>
        m.title.toUpperCase().startsWith(searchQuery.toUpperCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      genres,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0) {
      return (
        <span className="badge badge-warning">
          There are no movies in the database.
        </span>
      );
    }

    const { totalCount, data: movies } = this.getPagedData();

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
              <div>
                <Link className="btn btn-primary" to="/movies/new">
                  New Movie
                </Link>
              </div>

              <span className="badge badge-primary">
                Showing {totalCount} movies in the database.
              </span>

              <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />

              <Pagination
                itemsCount={totalCount}
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
