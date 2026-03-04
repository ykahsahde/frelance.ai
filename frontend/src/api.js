import axios from "axios";

const API = axios.create({
  baseURL: "https://frelance-ai.onrender.com/"
});

export default API;