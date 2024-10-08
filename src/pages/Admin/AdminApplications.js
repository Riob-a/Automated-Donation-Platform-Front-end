import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of applications per page
  const navigate = useNavigate(); // Initialize navigate

  // Fetch Applications
  useEffect(() => {
    fetch("https://automated-donation-platform-back-end.onrender.com/unapproved-charities")
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  // Handle approval
  const handleApprove = (id) => {
    fetch(`https://automated-donation-platform-back-end.onrender.com/unapproved-charities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to approve charity');
        }
      })
      .then((data) => {
        setApplications((prevApplications) =>
          prevApplications.filter((app) => app.id !== id)
        );
        alert("Charity has been approved and moved!");
      })
      .catch((error) => console.error("Error approving application:", error));
  };

  // Rejection Logic
  const handleReject = (id) => {
    fetch(`https://automated-donation-platform-back-end.onrender.com/unapproved-charities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Rejected" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to reject charity');
        }
      })
      .then(() => {
        setApplications((prevApplications) =>
          prevApplications.filter((app) => app.id !== id)
        );
        alert("Application has been rejected!");
      })
      .catch((error) => console.error("Error rejecting application:", error));
  };

  // Pagination logic
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  const totalPages = Math.ceil(applications.length / itemsPerPage);

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

  // Page content
  return (
    <div className="bg-dark p-4">
      <div>
        <div className="row p-1 mt-5 rounded">
          <div className="col">
            <div className="header-component">
              <h1>ADMIN</h1>
              <h6>Applications</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-4 m-2">
        <h5 className="text-light bg-dark"><b>Pending</b></h5>
        <h3 className="text-light bg-dark">Applications</h3>

        {currentApplications.map((app) => (
          <div key={app.id} className="card bg-secondary mb-3 p-4 shadow p-3 mb-5 rounded-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={app.image_url || "placeholder-image-url"}
                  className="bd-placeholder-img img-fluid rounded-start"
                  alt={app.name}
                  width="100%"
                  height="250"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title text-light">{app.name}</h5>
                  <p className="card-text text-light">{app.description}</p>
                  <p className="card-text">
                    <small className="text-body-secondary"><b>Last updated {new Date(app.date_submitted).toLocaleString()}</b></small>
                  </p>
                  <button className="btn btn-dark" onClick={() => handleApprove(app.id)}>
                    Approve
                  </button>
                  <button className="btn btn-dark m-4" onClick={() => handleReject(app.id)}>
                    Reject
                  </button>
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
          <button className="btn btn-warning float-end rounded-pill" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminApplications;
