import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAPI } from '../apiMovieDetail';

import PersonalDetail from '../components/PersonalDetail';

function MovieDetail() {
  const { imdbID } = useParams();
  const { loading, error, movie } = useAPI(imdbID);
  const [selectedPrincipalId, setSelectedPrincipalId] = useState(null);

  const handlePrincipalClick = (params) => {
    const id = params.data.id;
    setSelectedPrincipalId(id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const formattedBoxOffice = movie.boxoffice
    ? movie.boxoffice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : 'Not Found';

  const plotWithNewLines = movie.plot ? movie.plot.replace(/\.\s/g, '.\n') : '';
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Roboto, sans-serif', fontSize: '18px', margin: '20px' }}>
      <div style={{ maxWidth: '60%' }}>
        {movie.title ? (
          <>
            <h1 style={{ color: 'black', marginTop: '20px', fontFamily: 'Nunito, sans-serif' }}>{movie.title}</h1>
            <div
              style={{
                border: '1px solid',
                padding: '20px',
                whiteSpace: 'pre-wrap',
                color: 'white',
                backgroundColor: '#000000',
              }}
            >
              {plotWithNewLines}
            </div>
            <p style={{ color: 'black', marginBottom: '5px', marginTop: '20px' }}>Released in: <span style={{ color: 'black' }}>{movie.year}</span></p>
            <p style={{ color: 'black', marginBottom: '5px' }}>Runtime: <span style={{ color: 'black' }}>{movie.runtime} min</span></p>
            <p style={{ color: 'black', marginBottom: '5px' }}>Genres: <span style={{ color: '#f5c518' }}>{movie.genres.join(', ')}</span></p>
            <p style={{ color: 'black', marginBottom: '5px' }}>Country: <span style={{ color: 'black' }}>{movie.country}</span></p>
            <p style={{ color: 'black', marginBottom: '5px' }}>Box Office: <span style={{ color: '#FF0000' }}>{formattedBoxOffice}</span></p>
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Character(s)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  movie.principals.reduce((pile, principal) => {
                    if (!pile[principal.category]) {
                      pile[principal.category] = {
                        category: principal.category,
                        names: [],
                        characters: [],
                      };
                    }
                    pile[principal.category].names.push({ id: principal.id, name: principal.name });
                    pile[principal.category].characters.push(...principal.characters);
                    return pile;
                  }, {})
                ).map(([category, { names, characters }], index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{category}</td>
                    <td>
                      {names.map(({ id, name }, index) => (
                        <a href={`http://localhost:3000/people/${id}`} key={index} onClick={() => handlePrincipalClick(id)}>
                          {name}
                          {index !== names.length - 1 && ', '}
                        </a>
                      ))}
                    </td>
                    <td>{characters.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
  
            </table>
            {selectedPrincipalId && <PersonalDetail selectedPrincipalId={selectedPrincipalId} />}
          </>
        ) : (
          <p>No movie data found.</p>
        )}
      </div>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          height: '100%',
          width: 'auto',
          alignSelf: 'flex-start',
          margin: '20px auto',
          marginTop: '73px'
        }}
      />
    </div>
  );
}

export default MovieDetail;
