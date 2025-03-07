import React from "react"

function MovieSearchBar({ placeholder, search, setSearch, handleSearch }) {
  return (
    <div className="movie-searchBar">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
      />
    </div>
  );
}

export default MovieSearchBar;


