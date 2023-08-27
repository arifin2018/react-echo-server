import axios from 'axios'
import API_URL from '../Constant/api-url'

const API = async (props) => {
  const {
    path, method, params, data,token
  } = props
  const timeout = 15e3
  // const token = localStorage.getItem('token')
  const config = {
    timeout,
    baseURL: API_URL,
    url: path,
    method,
    params,
    data,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios(config)
  return response.data
}

export default API