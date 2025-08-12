const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const moviesJSON = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json()) // CORS --> validacion de 'Content-Type: application/json'
app.use(cors({
    origin: (origin, callback) => { // Validacion para aceptar PORT 
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:5173',
        ]

        if (ACCEPTED_ORIGINS.includes(origin) || (!origin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowerd by CORS'))
    }
})) // CORS instalado, por defecto el "*"

app.disable('x-powered-by')

// Metodos normales: GET/HEAD/POST
// Metodos complejos: PUT/PATCH/DELETE
// CORS Pre-flight

// OPTIONS

app.get('/movies', (req, res) => {

    const { genre } = req.query
    if (genre) {
        const filteredMovies = moviesJSON.filter(
            movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(moviesJSON)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
    const { id } = req.params
    const movie = moviesJSON.find((x) => x.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

app.patch('/movies/:id', (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
        res.statusCode(400).json({ message: JSON.parse(result.error.message) })
    }

    const movieIndex = moviesJSON.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updatedMovie = {
        ...moviesJSON[movieIndex],
        ...result.data
    }

    moviesJSON[movieIndex] = updatedMovie

    return res.json(updatedMovie)
})

// DELETE
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = moviesJSON.findIndex((x) => x.id === id)

    if (movieIndex === -1) return res.statusCode(404).json({ message: 'Movie not found' })

    moviesJSON.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    // No es REST porque se esta guardando en memoria
    moviesJSON.push(newMovie)

    res.status(201).json(newMovie)
})

/*
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin) // --> CORS
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.send(200)
}) 
*/

app.use((req, res) => {
    res.status(404).send('404 Not Found')
})


app.listen(PORT, () => {
    console.log(`Server listenning in PORT http://localhost:${PORT}`)
})