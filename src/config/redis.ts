const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
}

export {
  connection
}