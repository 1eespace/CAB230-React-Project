import { useState, useEffect } from "react";

const API_URL = "http://sefdb02.qut.edu.au:3000";

function usePeopleAPI(id) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}/people/${id}`;
        const token = localStorage.getItem("token");
        const headers = {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        };
        const response = await fetch(url, { headers });
        const responses = await response.json();

        if (responses.error) {
          throw new Error(responses.message);
        }

        const roles = responses.roles.map((role) => ({
          movieName: role.movieName,
          movieId: role.movieId,
          category: role.category,
          characters: role.characters,
          imdbRating: role.imdbRating,
        }));

        const data = {
          name: responses.name,
          birthYear: responses.birthYear,
          deathYear: responses.deathYear,
          roles: roles,
        };

        setData(data);
      } catch (error) {
        console.error("Error fetching person details: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    loading,
    data,
    error,
  };
}

export default usePeopleAPI;
