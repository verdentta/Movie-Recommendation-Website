const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ensure you have cors middleware installed
const db = require('./db'); // Import the database connection

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Use CORS to handle cross-origin requests
app.use(bodyParser.json());

// Log request headers
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to fetch all movies
app.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err.stack);
      res.status(500).send('Error fetching movies');
    } else {
      res.json(results);
    }
  });
});

// Route to add a new movie
app.post('/movies', (req, res) => {
  const { title, release_year, description, image_url } = req.body;
  const query = 'INSERT INTO movies (title, release_year, description, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [title, release_year, description, image_url], (err, results) => {
    if (err) {
      console.error('Error adding movie:', err.stack);
      res.status(500).send('Error adding movie');
    } else {
      res.status(201).send('Movie added successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});