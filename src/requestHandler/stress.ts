import axios from 'axios'
import { config } from 'dotenv-flow'

config({ silent: true })

axios.defaults.baseURL = 'http://localhost:3333';

let MAX_REQUESTS = 50

if (process.env.NUMBER_OF_REQUESTS) {
  MAX_REQUESTS = parseInt(process.env.NUMBER_OF_REQUESTS)
}

console.log(MAX_REQUESTS)

const requests: Promise<any>[] = []

for (let i = 0; i < MAX_REQUESTS; i++) {
  requests.push(axios('/stress').then((res) => {
    console.log({ 
      i,
      count: res.data.count
    })
  }))
}
Promise.all(requests).then(res => {
  console.log('success')
})
.catch((err) => {
  console.log(err)
})
