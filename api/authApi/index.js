import axios from 'axios'
import URL from '@/helpers/constants/api/auth'

export default {
  logInUser (data) {
    return axios.post(`${URL.USER_LOGIN}`, data)
  },
}
