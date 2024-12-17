import React, { useState, useEffect } from 'react';
import '../../style/authstyles/register.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setDescription] = useState('');
  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:3000/course/');
        const institutionsResponse = await axios.get('http://localhost:3000/institutions');
        setCourses(coursesResponse.data);
        setInstitutions(institutionsResponse.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/request/create', {
        name,
        email,
        contact,
        reason,
      course_id: selectedCourse,
        institutionId: selectedInstitution,
      });

      console.log('Registration successful:', response.data);

      if (response.data) {
        navigate('/');
      }

      const user = response.data;
      if (user.id) {
        localStorage.setItem('userId', user.id);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="register">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Request</span>
          <span className="subtitle">Send a Request and wait for a response</span>
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="input"
              placeholder="Tel Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <textarea
              className="input"
              placeholder="Description"
              value={reason}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <select
              className="input"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
            <select
              className="input"
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
            >
              <option value="">Select Institution</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}>{institution.name}</option>
              ))}
            </select>
          </div>
          {error && <p className="error">** {error} **</p>}
          <button type="submit">Send Request</button>
        </form>
        <div className="form-section">
          <p>Have an account? <NavLink to="/auth/login">Log in</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default Request;
