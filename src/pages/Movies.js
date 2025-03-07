import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";


//Grid
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

//Components
import MovieSearchBar from "../components/MovieSearchBar";
import YearDropdownBar from "../components/YearDropdownBar";

//Import apiMovies.js 
import { useAPI } from "../apiMovies";
import MovieDetail  from "../components/MovieDetail";

function Movies() {
  const { loading, error, movies } = useAPI();
  const [search, setSearch] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  
  // MovieDetail, page when click individual movie
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const navigateToMovies = useCallback((search, year, page) => {
    let url = "/movies";

    if (search && year) {
      url += `?title=${search}&year=${year}&page=${page}`;
    } else if (search) {
      url += `?title=${search}&page=${page}`;
    } else if (year) {
      url += `?year=${year}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    navigate(url);
  }, [navigate]);

  const handleSelect = (year) => {
    setSelectedYear(year);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      navigateToMovies(search, selectedYear, 1);
    }
  };

  const handlePaginationChanged = useCallback((event) => {
    setCurrentPage(event.api.paginationGetCurrentPage() + 1);
  }, []);

  useEffect(() => {
    if (!loading && movies && !error) {
      let filteredMovies = [];
      if (search) {
        filteredMovies = movies.filter(
          (movie) =>
            movie.title.toUpperCase().includes(search.toUpperCase())
        );
      }
      if (selectedYear) {
        filteredMovies = filteredMovies.filter(
          (movie) => parseInt(movie.year) === parseInt(selectedYear)
        );
      }
      setRowData(filteredMovies);
      navigateToMovies(search, selectedYear, currentPage);
    }
  }, [loading, error, movies, search, selectedYear, currentPage, navigateToMovies]);

  const columnDefs = [
    { 
      headerName: "Title", 
      field: "title", 
      sortable: true,
      width: 350,
    },  
    { 
      headerName: "More Details", 
      field: "button",  
      width: 150, 
      cellRenderer: () => ( <button className="details-button">Details</button> ),      
      onCellClicked: (params) => { 
        const imdbID = params.data.imdbID;
        const imdbUrl = `http://localhost:3000/movies/data/${imdbID}`;
        setSelectedMovie(params.data);
        setShowMovieDetail(true);
        window.location.href = imdbUrl;
      }
    },  
    { headerName: "Year", field: "year" },    
    { headerName: "IMDB rating", field: "imdbRating" },    
    { headerName: "RottenTomatoes", field: "rottenTomatoesRating" },    
    { headerName: "Metacritic", field: "metacriticRating" },    
    { headerName: "Rated", field: "classification" }
  ];
  
  const reset = () => {
    setRowData(movies);
    setSearch("");
    setSelectedYear(null);
  };
  
  if (loading) {
    return <p>...Loading...</p>;
  }
  if (error){
    if (error.message === "400" || error === true ){
        return <p>Invalid year query parameter, Format must be yyyy.</p>
    } else if (error.message == null){
        return <p>Network Error.</p>
    } else {
        return <p>The page you are looking for is temporarily unavailable. Please try again later :( code: {error.message}</p>
    }   
}

  return (
    <Container className="table_wrapper">
      <h1 className="page-title">Movies_List</h1>
      <h5 style={{color: "Red"}}>Enter the movie title you want to find first, and filter the year</h5>
      <Row className="filter-wrapper">
       <Col xs="12" sm="6">
       <p style={{float: "left", padding: "55px", 
                  fontSize: 20, 
                }}>
          Movies containing the text
       </p>
       <React.Fragment>
        <div className="search-filter">
          <MovieSearchBar
            placeholder="Search Title"
            type="text" 
            search={search}
            setSearch={setSearch}
            selectedYear={selectedYear}
            onKeyPress={handleKeyPress}
            onChange={handleSearch}
          />
        </div>
      </React.Fragment>
      </Col>
       <Col xs="12" sm="3">
       <p style={{float: "left", padding: "55px", 
                  marginLeft: "-100px", fontSize: 20
                }}>
          From
       </p>
       </Col>
       <Col xs="12" sm="3">
       <React.Fragment>
        <div className="year-filter">
          <YearDropdownBar setDropdownItem={handleSelect} selectedYear={selectedYear} />
        </div>
       </React.Fragment>
       </Col>
        <Col xs="12" sm="3">
          <Button className="reset-button"
                  id="reset-button" 
                  type="button" 
                  onClick={() => reset()}
                  style={{
                    backgroundColor: "rgb(19, 95, 30)",
                    color: "white",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 30px", 
                  }}
          >
            Reset
          </Button>
        </Col>
      </Row>

        {search !== "" && rowData.length === 0 && (
          <h3 className="search-error-message">
            Not Found!!
          </h3>
        )}
        <div
        className="ag-theme-alpine"
        style={{
          height: "500px",
          width: "100%",
          fontSize: "14px",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={15}
          headerHeight={40}
          rowHeight={40}
          minColWidth={300}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          onPaginationChanged={handlePaginationChanged}
        />
        {showMovieDetail && <MovieDetail movie={selectedMovie} />}
      </div>
    </Container> 
  )
}

export default Movies;