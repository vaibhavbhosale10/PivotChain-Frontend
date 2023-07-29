import axios from "axios";
import Endpoints from "./endpoints";
const API = axios.create({
  baseURL: `${Endpoints.serverBaseURL}/api`,
});
export default API;
