import axios from "axios";

// export const BASE_URL = "http://localhost:3000/api";
export const BASE_URL = "https://backendxclone-production.up.railway.app/api";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
