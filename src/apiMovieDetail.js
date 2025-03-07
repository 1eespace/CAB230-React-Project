import { useState, useEffect } from "react";

export function useAPI(imdbID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`);
        const data = await response.json();
        const principals = data.principals.map((principal) => ({
          id: principal.id,
          category: principal.category,
          name: principal.name,
          characters: principal.characters,
        }));
        const movie = {
          title: data.title,
          year: data.year,
          runtime: data.runtime,
          genres: data.genres,
          country: data.country,
          boxoffice: data.boxoffice || null, // Add null check here
          poster: data.poster,
          plot: data.plot,
          principals: principals,
        };
        setMovie(movie);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [imdbID]);

  return { loading, error, movie };
}


// if (response.status === 200) {
          
// }