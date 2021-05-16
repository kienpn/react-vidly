import httpService from "./httpService";
import config from "../config.json";
import { getGenres } from "../services/genreService";

const apiEndpoint = config.apiUrl + "/movies";

export function getMovies() {
  return httpService.get(apiEndpoint);
}

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovie(movieId) {
  return httpService.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movieUrl(movie._id), body);
  }

  return httpService.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return httpService.delete(movieUrl(movieId));
}
