import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import "./App.css";

const FetchData = () => {
  const [launchData, setLaunchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 10;

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((response) => response.json())
      .then((data) => setLaunchData(data))
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = launchData.slice(
    indexOfFirstLaunch,
    indexOfLastLaunch
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="launch-container">
        {currentLaunches.map((launch) => (
          <div key={launch.id} className="launch-card">
            <img src={launch.links.patch.small} alt={launch.name} />
            <h3>{launch.name}</h3>
            <p>{launch.details || "No details available"}</p>
            <div className="launch-info">
              <span>Flight Number: {launch.flight_number}</span>
              <span>
                Date: {new Date(launch.date_utc).toLocaleDateString()}
              </span>
            </div>
            <div className="launch-links">
              <a href={launch.links.article} target="_blank" rel="noreferrer">
                Read Article
              </a>
              {launch.links.webcast && (
                <a
                  href={`https://www.youtube.com/watch?v=${launch.youtube_id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "red", margin: "10px" }}
                >
                  <FaYoutube /> Watch Webcast
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(launchData.length / launchesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default FetchData;
