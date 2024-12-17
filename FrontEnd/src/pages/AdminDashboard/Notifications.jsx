import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/adminstyles/requests.css';
import useSideBar from "../../re-components/Admin/UseSidebar";

const Notifications = () => {
  useSideBar(); // Hook for sidebar handling (if applicable)

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/request');
        setRequests(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to fetch requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle Accept Request
  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:3000/request/accept/${id}`);
      alert('Request accepted, and an email has been sent to the user.');
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } catch (err) {
      console.error('Error accepting request:', err.response || err);
      alert('Failed to accept the request. Please try again.');
    }
  };
  

  // Handle Dismiss Request
  const handleDismiss = async (id) => {
    try {
      await axios.post(`http://localhost:3000/request/dismiss/${id}`);
      alert('Request dismissed, and an email has been sent to the user.');
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } catch (err) {
      console.error('Error dismissing request:', err);
      alert('Failed to dismiss the request. Please try again.');
    }
  };

  return (
    <div className="admin-requests main" id="main">
      <h1>Requests</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <div className="requests-container">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div className="request-card" key={request.id}>
                <h2>{request.name}</h2>
                <p>
                  <strong>Institution:</strong> {request.institution?.name || 'N/A'}
                </p>
                <p>
                  <strong>Course:</strong> {request.course?.title || 'N/A'}
                </p>
                <p>
                  <strong>Email:</strong> {request.email}
                </p>
                <p>
                  <strong>Description:</strong> {request.reason}
                </p>
                <div className="actions">
                  <button
                    className="btn accept"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn dismiss"
                    onClick={() => handleDismiss(request.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No requests to show.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
