const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const db = require('./db');

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile);

// Configure session middleware
app.use(session({
  secret: '98asd90as90da90sd8a09sd90asd909d23kl4j',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({ checkPeriod: 86400000 }), // 24 hours
  cookie: { maxAge: 300000 } // session timeout of 5 minutes
}));

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
  credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Log request headers
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});


// Route to log user info when index page is loaded
app.get('/log-user-info', (req, res) => {
  if (req.session.isLoggedIn) {
      console.log(`User ${req.session.username} accessed the index page`);
      res.send('User info logged successfully');
  } else {
      res.send('User not logged in');
  }
});

// Home route
app.get('/', (req, res) => {
  if (req.session.isLoggedIn) {
    console.log('User is logged in');
  } else {
    console.log('User is not logged in');
  }
  res.send('Connected to the database!');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Logged out successfully");
    }
  });
});

// Session route for testing
app.get('/session', (req, res) => {
  if (req.session.isLoggedIn) {
    res.json({ isLoggedIn: true, username: req.session.username });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Route to serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'signup.html'));
});

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'login.html'));
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
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error authenticating user:', err.stack);
      res.status(500).send('Error authenticating user');
    } else {
      if (results.length > 0) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            res.status(500).send('Error saving session');
          } else {
            res.status(200).send('Login successful');
          }
        });
      } else {
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
