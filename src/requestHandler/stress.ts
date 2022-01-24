import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3333';

const MAX_REQUESTS = process.env.NUMBER_OF_REQUESTS || 250

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
