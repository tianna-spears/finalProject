// create API (dataInput route and controller on backend)

// connect front-end to back-end here with Axios, each front-end
// url has to match the backend endpoint

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_RENDER_API
});

export default API;