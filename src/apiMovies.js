import { useState, useEffect } from "react";

export function useAPI() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://sefdb02.qut.edu.au:3000/movies/search');
        const data = await response.json();
        
        const movies = data.data.map(movie => ({
          title: movie.title,
          year: movie.year,
          imdbID: movie.imdbID,
          imdbRating: movie.imdbRating,
          rottenTomatoesRating: movie.rottenTomatoesRating,
          metacriticRating: movie.metacriticRating,
          classification: movie.classification,
        }));
    
        setMovies(movies);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return { loading, error, movies };
}