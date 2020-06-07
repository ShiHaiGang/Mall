import axios from "axios";

// const BaseUrl = "http://localhost:8080/api";
const API = "http://192.168.0.105:8080/api" || "http://localhost:8080/api";
const CITY = "http://192.168.0.105:8080/city" || "http://localhost:8080/city";

export default {
  get(param = {}) {
    let query = "";
    let BaseUrl = "";
    let object = param.body;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        query += `${key}=${object[key]}&`;
      }
    }
    param.city ? (BaseUrl = CITY) : (BaseUrl = API);
    return axios.get(
      `${BaseUrl}${param.url}?${query.substring(0, query.length - 1)}`
    );
  }
};
