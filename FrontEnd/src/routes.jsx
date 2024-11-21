import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/AdminDashboard/Home';
import Students from './pages/AdminDashboard/Students';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Student/Dashboard';
import Repayment from  './pages/Student/Repayment'
import Profile from './pages/Student/Profile'

const Routing = () => {
    return (
        <Router>
            <Routes>
                {/* Christian Routes */}
                <Route path="/login" element={<Login />} />

                {/* Shelbys Routes */}
                <Route path="/" element={<AdminLayout> <Home /></AdminLayout>} />
                <Route path="/students" element={<AdminLayout> <Students /></AdminLayout>} />
                
                {/* Janes Routes */}
                <Route path="/student-dashboard" element={<StudentLayout> <Dashboard/> </StudentLayout>} />
                <Route path="/student-repayment" element={<StudentLayout> <Repayment/> </StudentLayout>} />
                <Route path="/student-profile" element={<StudentLayout> <Profile/> </StudentLayout>} />
            </Routes>
        </Router>
    )
}

export default Routing;