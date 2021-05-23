import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";

export function login(email, password) {
  return httpService.post(apiEndpoint, {
    email,
    password,
  });
}
