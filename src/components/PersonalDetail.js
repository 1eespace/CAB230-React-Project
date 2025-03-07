import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePeopleAPI from "../apiPeopleId";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PersonalDetail() {
  // Hooks
  const { id } = useParams();
  const { loading, data, error } = usePeopleAPI(id);
  const [rowData, setRowData] = useState([]);

  // Columns definition for AgGridReact
  const columnDefs = [
    { headerName: "Role", field: "category", width: 150 },
    { headerName: "Movie", field: "movieName", width: 300 },
    { headerName: "Characters", field: "characters", width: 300 },
    { headerName: "Rating", field: "imdbRating", width: 150 },
  ];

  // Transform data for line chart
  const transformedData = rowData.map((d) => ({
    movieName: d.movieName,
    rating: d.imdbRating,
  }));

  // Update rowData state when API data is loaded
  useEffect(() => {
    if (data && data.roles) {
      setRowData(data.roles);
    }
  }, [data]);

  // Render loading indicator while API data is being fetched
  if (loading) {
    return <div>...Loading...</div>;
  }
  if (error) {
    return <div>
      <h1>Error: The server responded with a status of 401 (Unauthorized)</h1>
      </div>;
  }

  // Render page content with fetched data
  return (
    <>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>
            {data.birthYear} - {data.deathYear}
          </p>
          <div
            className="ag-theme-alpine"
            style={{
              width: "80%",
              height: "80%",
              margin: "0 auto",
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
              headerHeight={40}
              rowHeight={40}
              minColWidth={300}
              domLayout="autoHeight"
            />
          </div>
          <div>
            <h1>Ratings at a Glance</h1>
            <div className="chart">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  width={600}
                  height={300}
                  data={transformedData}
                  margin={{
                    top: 5,
                    right: 63,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="movieName" tick={{ fontSize: 12 }} />
                  <YAxis type="number" domain={[0,10]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating" stroke="blue" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PersonalDetail  