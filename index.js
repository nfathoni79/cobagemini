import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-gemini-api-key'

app.get('/', (req, res) => {
  res.send('Coba Gemini')
})

app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

export default app
