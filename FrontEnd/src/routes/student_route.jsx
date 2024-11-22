import { Route, Routes } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import Dashboard from '../pages/Student/Dashboard';
import Repayment from  '../pages/Student/Repayment'
import Profile from '../pages/Student/Profile'

const StudentRoute = () => {
    return (
        
            <Routes>
                <Route path="/student-dashboard" element={<StudentLayout> <Dashboard/> </StudentLayout>} />
                <Route path="/student-repayment" element={<StudentLayout> <Repayment/> </StudentLayout>} />
                <Route path="/student-profile" element={<StudentLayout> <Profile/> </StudentLayout>} />
            </Routes>
    
    )
}

export default StudentRoute;