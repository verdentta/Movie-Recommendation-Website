const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ensure you have cors middleware installed
const db = require('./db'); // Import the database connection
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Use CORS to handle cross-origin requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Log request headers
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// Route to serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'signup.html'));
});

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'login.html'));
});




// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Connected to the database!');
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

// Route to register a new user
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error registering user:', err.stack);
      res.status(500).send('Error registering user');
    } else {
      res.status(201).send('User registered successfully');
    }
  });
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check if the username and password are correct
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error authenticating user:', err.stack);
      res.status(500).send('Error authenticating user');
    } else {
      // Check if any rows were returned from the query
      if (results.length > 0) {
        // Authentication successful
        res.status(200).send('Login successful'); // You can also send a token or set a session here
      } else {
        // Authentication failed
        res.status(401).send('Invalid username or password');
      }
    }
  });
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});