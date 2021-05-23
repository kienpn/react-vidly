import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return httpService.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.username,
  });
}
