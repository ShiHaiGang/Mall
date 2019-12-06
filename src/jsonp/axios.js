import axios from "axios";

// var BaseUrl = "http://localhost:8080/api";
var BaseUrl = "http://192.168.0.105:8080/api" || "http://localhost:8080/api";

export default {
  get(param = {}) {
    let query = "";
    let object = param.body;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        query += `${key}=${object[key]}&`;
      }
    }
    return axios.get(
      `${BaseUrl}${param.url}?${query.substring(0, query.length - 1)}`
    );
  }
};
