// import dotenv from 'dotenv'
import * as dotenv from 'dotenv'
import mongodb from 'mongodb'
import mongoose from 'mongoose'
import ReviewsDAO from './dao/reviews.DAO.js'
import app from './server.js'

dotenv.config()
// const MONGODB_URI = 'mongodb+srv://[name]:[pw]@cluster0.[cluster].mongodb.net/?retryWrites=true&w=majority'

// Setup MongoDB
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB - OK'))
  .catch((error) => console.log('DB - error', error))

// Launch server v1
// app.listen(process.env.PORT || 4444, (error) => {
//   if (error) {
//     return console.log('Server - error', error)
//   }
//   console.log('Server - OK')
// })

// Launch server v2
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 4444 // const port = 8000

MongoClient.connect(process.env.MONGODB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((error) => {
    console.log('Server - error:', error)
    console.error(error.stack)
    process.exit(1)
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log('Server - OK,', `listening on port ${port}`)
    })
  })
