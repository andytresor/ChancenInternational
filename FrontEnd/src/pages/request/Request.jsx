import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../style/authstyles/register.css';
import '../request/request.css'

export default function Request() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    raison_de_la_demande: "",
    courseId: "",
    institutionId: ""
  });
  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInstitutions();
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data before submission:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/formulaire/create",
        formData
      );
      console.log("la reponse est", response);

      alert("Formulaire soumis");
      console.log(response);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        contact: "",
        raison_de_la_demande: "",
        courseId: "",
        institutionId: ""
      });
      console.log("Form data after reset:", formData);
    } catch (err) {
      setError("La requête a échoué. Veuillez vérifier vos informations.");
      console.error("la requette n'est pas partie", err);
    }
  }


  const fetchInstitutions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/institutions");
      setInstitutions(response.data);
      // console.log(response.data);

    } catch (error) {
      console.error("Erreur lors de la récupération des institutions:", error);
      setError("Impossible de charger les institutions.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/course/all");
      setCourses(response.data);
      // console.log(response);

    } catch (error) {
      console.error("Erreur lors de la récupération des cours:", error);
      setError("Impossible de charger les cours.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="request">
      <div className="form-box">
        <form onSubmit={handleSubmit} className="form">
          <span className="title">Request  Form</span>
          <span className="subtitle">Please fill the Form.</span>
          <div className="form-container">
            <input
              type="text"
              name="name"
              className="input"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              className="input"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <textarea 
              id="textarea"
              name="raison_de_la_demande"
              className="input"
              placeholder="Raison"
              value={formData.raison_de_la_demande}
              onChange={handleChange}
              required
            />
            <select
              name="institutionId"
              value={formData.institutionId}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Sélectionnez une institution</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name}
                </option>
              ))}
            </select>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Sélectionnez un cours</option>
              {courses.map((cour) => (
                <option key={cour.id} value={cour.id}>
                  {cour.title}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="error">* {error} *</p>}
            <button type="submit">Submit</button>
        </form>

      </div>
    </div>
  );
}
