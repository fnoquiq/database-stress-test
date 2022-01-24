import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3333';

axios('/configure').then((res) => {
  console.log('ok')
})
.catch((err) => {
  console.log(err)
})