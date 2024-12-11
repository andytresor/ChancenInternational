import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSideBar from "../../re-components/Admin/UseSidebar";

const Details = () => {

  useSideBar();

  const { id } = useParams(); // Extract the id from the URL
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fundings/${id}`);
        setDetails(response.data); 
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load details");
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main" id="main">
      <h1>Funding Details</h1>
      {details ? (
        <div>
          <p><strong>Funding ID:</strong> {details.id}</p>
          <p><strong>Student ID:</strong> {details.studentId}</p>
          <p><strong>Total Debt:</strong> {details.totalDebt}</p>
          <p><strong>Status:</strong> {details.isActive ? "In Progress" : "Inactive"}</p>
        </div>
      ) : (
        <p>No details available for this ID.</p>
      )}
    </div>
  );
};

export default Details;

