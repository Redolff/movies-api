import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'
import { MovieModel } from './models/movie.js'

const PORT = process.env.PORT || 3000
const app = express()
app.use(json()) // CORS --> validacion de 'Content-Type: application/json'
app.use(corsMiddleware()) // CORS instalado, por defecto el "*"
app.disable('x-powered-by')

app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

app.use((req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})