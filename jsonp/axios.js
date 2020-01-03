import axios from 'axios'

const HOST = 'http://localhost:3000'
const API = 'http://localhost:3000/api'
const CITY = 'http://localhost:3000/city'

export default {
  get(param = {}) {
    let query = ''
    let BaseUrl = ''
    const object = param.body
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        query += `${key}=${object[key]}&`
      }
    }
    switch (param.type) {
      case 'city':
        BaseUrl = CITY
        break
      case 'api':
        BaseUrl = API
        break
      default:
        BaseUrl = HOST
        break
    }
    return axios.get(
      `${BaseUrl}${param.url}?${query.substring(0, query.length - 1)}`
    )
  },
  post(param = {}) {
    return axios.post(`${HOST}${param.url}`, { ...param.body })
  }
}
