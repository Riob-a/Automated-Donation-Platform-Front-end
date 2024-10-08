import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./Admin.css";

function AdminCharities() {
  const [charities, setCharities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of charities per page
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch charities from the backend
    fetch("https://automated-donation-platform-back-end.onrender.com/charities")
      .then((response) => response.json())
      .then((data) => setCharities(data))
      .catch((error) => console.error("Error fetching charities:", error));
  }, []);

  const handleDelete = (id) => {
    // Send DELETE request to the backend
    fetch(`https://automated-donation-platform-back-end.onrender.com/charities/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted charity from the state
          setCharities(charities.filter((charity) => charity.id !== id));
          alert("Charity has been deleted");
        } else {
          console.error("Error deleting charity");
        }
      })
      .catch((error) => console.error("Error deleting charity:", error));
  };

  // Pagination logic
  const indexOfLastCharity = currentPage * itemsPerPage;
  const indexOfFirstCharity = indexOfLastCharity - itemsPerPage;
  const currentCharities = charities.slice(indexOfFirstCharity, indexOfLastCharity);

  const totalPages = Math.ceil(charities.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
//Page content
  return (
    <div className="bg-dark">
      <div className="container p-4 mt-5 bg-dark">
        <div className="card text-bg-dark border-w p-3 shadow p-3 mb-5 rounded-pill">
          <h5 className="text-light"><b>Track</b></h5>
          <h3 className="text-light">The following</h3>
        </div>

        {currentCharities.map((charity) => (
          <div key={charity.id} className="card bg-secondary mb-3 p-4 shadow p-3 mb-5 rounded-5">
            <div className="row g-0">
              <div className="col-md-4">
                {charity.image_url ? (
                  <img
                    src={charity.image_url}
                    className="bd-placeholder-img img-fluid rounded-start"
                    alt={charity.name}
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <svg
                    className="bd-placeholder-img img-fluid rounded-start"
                    width="100%"
                    height="250"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Image"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text>
                  </svg>
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body text-light">
                  <h5 className="card-title text-light fs-4">{charity.name}</h5>
                  <p className="card-text fs-4">{charity.description}</p>
                  <br />
                  <button onClick={() => handleDelete(charity.id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination controls */}
        <div className="pagination-controls mt-4">
          <button
            className="btn btn-warning rounded-pill"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2 text-light">
            {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-warning rounded-pill"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        {/* Back Button */}
        <button className="btn btn-warning  float-end rounded-pill" onClick={() => navigate(-1)}>
          Go Back
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default AdminCharities;
