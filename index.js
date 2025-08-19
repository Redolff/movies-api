import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { movieRouter } from './routes/movies.js'
import { MovieModel } from './models/movie.js'
import { serieRouter } from './routes/series.js'
import { SerieModel } from './models/serie.js'
import { gameRouter } from './routes/games.js'
import { GameModel } from './models/game.js'

const PORT = process.env.PORT || 3000
const app = express()
app.use(json()) // CORS --> validacion de 'Content-Type: application/json'
app.use(corsMiddleware()) // CORS instalado, por defecto el "*"
app.disable('x-powered-by')

app.use('/movies', movieRouter({ movieModel: MovieModel }))
app.use('/series', serieRouter({ serieModel: SerieModel }))
app.use('/games', gameRouter({ gameModel: GameModel }))

app.use((req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})