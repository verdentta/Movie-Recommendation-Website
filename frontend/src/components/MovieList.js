import React, { useEffect, useState } from 'react';
import axios from 'axios';



const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(response => {
        setMovies(response.data); // Update the state with the fetched movies
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
        setError('There was an error fetching the movies!');
      });
  }, []); // Empty dependency array means this runs once when the component mounts
  

  

  return (
    <div>
      <h1>Movie List</h1>
      {error && <p>{error}</p>}
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.movie_id} className="movie-item">
            <img 
              src={movie.image_url} 
              alt={movie.title} 
              className="movie-image" 
            />
            <div>
              <h3>{movie.title}</h3>
              <p>({movie.release_year})</p>
              <p>{movie.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default MovieList;