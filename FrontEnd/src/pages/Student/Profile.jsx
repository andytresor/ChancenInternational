import React ,{useState,useEffect} from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import "../../style/studentstyles/profile.css";
import logo from "../../assets/Images/adminImages/Chance.png"
import axios from "axios";
const Profile = () => {
  useTopbar()


  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => { 
    const id = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis le stockage local 
    if (!id) return;  // Si l'ID n'est pas disponible, renvoyer immédiatement
    try { 
        const response = await axios.get(`http://localhost:3000/auth/one/${id}`); 
      console.log("Profile details",response.data[0]);
      
        setUser(response.data);} 
    catch (error) { 
        console.log(error);
          
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
            <img
              src={logo}
              alt="image"
            />
            <div className="info">
              <h2>{user.name}</h2>
              <p>Student</p>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="info">
            <h2>{user.name}'s Info</h2>
            <p>
              Hi, I'm {user.name}, Decisions: If you can't decide, the answer is no. If
              two equally difficult paths, choose the one more painful in the
              short term (pain avoidance is creating an illusion of equality).
            </p>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Tel : +237 {user.contact}</p>
            <p>Institution : {user.institution} </p>
          </div>
          <div className="employ">
            <h2>Employment Details</h2>
            <p>Name : {user.name}</p>
            <p>Employer: Google</p>
            <p>Contact : +237 123 456 789</p>
            <p>Salary : 500,000XAF</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;