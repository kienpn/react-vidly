import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/genres";

export function getGenres() {
  return httpService.get(apiEndpoint);
}
