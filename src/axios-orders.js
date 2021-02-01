import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-296d5-default-rtdb.firebaseio.com/",
});

export default instance;
