import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 🔁 matches your backend
});

export default instance;
