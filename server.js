import cors from 'cors'
import express from 'express'
import reviewsRoute from './routes/reviews.route.js'

// Setup Express Server v1
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1/reviews', reviewsRoute)
app.use('*', (req, res) => res.status(404).json({ error: 'route not found' }))

export default app
