import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSideBar from "../../re-components/Admin/UseSidebar";
import '../../style/adminstyles/student.css'; // Import CSS file for styling

const StudentForm = ({ studentId, onSave }) => {
    useSideBar();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        name: '',
        email: '',
        salary: '',
        institutionId: '',
        userId: null, // Add userId to manage the relationship
    });
    const [users, setUsers] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudentDetails = async () => {
        if (studentId) {
            try {
                const response = await axios.get(`http://localhost:3000/students/${studentId}`);

                const { user, email, salary, institution } = response.data;
                setStudentData({
                    name: user?.name || '',
                    email: email || '',
                    salary: salary || '',
                    institutionId: institution?.id || '',
                    userId: user?.id || null, // Ensure the userId is set
                });
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchInstitutions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/institutions');
            setInstitutions(response.data);
        } catch (error) {
            console.error('Error fetching institutions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchInstitutions();
        fetchStudentDetails();
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            const selectedUser = users.find((user) => user.name === value);
            setStudentData({
                ...studentData,
                name: value,
                email: selectedUser?.email || '',
                userId: selectedUser?.id || null, // Set the user ID
            });
        } else {
            setStudentData({ ...studentData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...studentData,
            salary: studentData.salary ? studentData.salary : null,
        };

        try {
            if (studentId) {
                await axios.patch(`http://localhost:3000/students/${studentId}`, payload);
            } else {

                await axios.post('http://localhost:3000/students', payload);
            }
            alert('Student saved successfully!');
            onSave();
            navigate('/admin/students');
        } catch (error) {
            console.error('Error saving student:', error);
            alert('Failed to save student.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="student-form-container">
            <form onSubmit={handleSubmit} className="student-form">
                <h2>{studentId ? 'Update Student' : 'Create Student'}</h2>
                <div className="form-group">
                    <label htmlFor="name">User:</label>
                    <select
                        id="name"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={studentData.email}
                        readOnly // Make it readonly since email is fetched automatically
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary:</label>
                    <input
                        id="salary"
                        type="number"
                        name="salary"
                        value={studentData.salary}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="institutionId">Institution:</label>
                    <select
                        id="institutionId"
                        name="institutionId"
                        value={studentData.institutionId}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Select Institution</option>
                        {institutions.map((inst) => (
                            <option key={inst.id} value={inst.id}>
                                {inst.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn-submit">
                    {studentId ? 'Update Student' : 'Create Student'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
