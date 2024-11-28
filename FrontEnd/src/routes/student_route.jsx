import { Route, Routes } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import Dashboard from '../pages/Student/Dashboard';
import Repayment from  '../pages/Student/Repayment'
import Profile from '../pages/Student/Profile'

const StudentRoute = () => {
    return (
        <StudentLayout>
            <Routes>
                <Route path="/student-dashboard" element={<Dashboard/>} />
                <Route path="/student-repayment" element={<Repayment/>} />
                <Route path="/student-profile" element={<Profile/>} />
            </Routes>
        </StudentLayout> 
    )
}

export default StudentRoute;