import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3333';

axios('/configure').then((res) => {
  console.log(res.data)
})
.catch((err) => {
  console.log(err)
})