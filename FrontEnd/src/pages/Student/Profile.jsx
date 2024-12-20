import React, { useState, useEffect } from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import "../../style/studentstyles/profile.css";
import logo from "../../assets/Images/adminImages/Chance.png";
import axios from "axios";
const Profile = () => {
  useTopbar();

  const [name, setName] = useState([])
  const [salary, setSalary] = useState([]);
  const [contact, setContact] = useState([])
  const [email, setEmail] = useState([])
  const [institution, setInstitution] = useState([])
  useEffect(() => {
    const id = localStorage.getItem("userId"); // Récupérer l'ID utilisateur depuis le stockage local
    if (!id) return; // Si l'ID n'est pas disponible, renvoyer immédiatement

    //Trying to display information using the email
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail"); // Get the user's email from local storage
      if (!email) return; // Return if no email is found

      try {
        //Checking name,email,contact and institution
        const response = await axios.get(
          `http://localhost:3000/request/all`
        );
        console.log("Request Details:", response.data);

        const matchingEmail = response.data.find(
          (request) => String(request.email) === String(email) 
        );
        if (matchingEmail) {
         setContact(matchingEmail.contact)
         setName(matchingEmail.name)
         setEmail(matchingEmail.email)
         setInstitution(matchingEmail.institution.name)
        } else {
          console.log("No matching email found.");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }

      //Set salary
      try {
        const studentsResponse = await axios.get(
          `http://localhost:3000/students`
        );
        console.log("Students Data:", studentsResponse.data);

        // Find the student with the matching userId
        const matchingStudent = studentsResponse.data.find(
          (student) => String(student.user.id) === String(id)
        );

        // If a matching student is found, set their salary
        if (matchingStudent) {
          setSalary(matchingStudent.salary);
        } else {
          console.log("No matching student found.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="main" id="main">
        <h1>Overview</h1>
        <div className="top">
          <div className="up"></div>
          <div className="cont">
            <img src={logo} alt="image" />
            <div className="info">
              <h2>{name ? `${name}` : "N/A"}</h2>
              <p>Student</p>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="info">
            <h2>{name ? `${name}` : "N/A"}'s Info</h2>
            <p>
              Hi, I'm {name ? `${name}` : "N/A"}, Decisions: If you can't decide, the answer is
              no. If two equally difficult paths, choose the one more painful in
              the short term (pain avoidance is creating an illusion of
              equality).
            </p>
            <p>Name : {name ? `${name}` : "N/A"}</p>
            <p>Email : {email ? `${email}` : "N/A"}</p>
            <p>Tel : +237 {contact ? `${contact}` : "N/A"}</p>
            <p>Institution : {institution ? `${institution}` : "N/A"} </p>
          </div>
          <div className="employ">
            <h2>Employment Details</h2>
            <p>Name : {name ? `${name}` : "N/A"}</p>
            <p>Employer: Google</p>
            <p>Contact : +237 123 456 789</p>
            <p>Salary : {salary ? `${salary} XAF` : "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
