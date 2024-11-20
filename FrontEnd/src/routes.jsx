import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/AdminDashboard/Home';
import Students from './pages/AdminDashboard/Students';
import Login from './pages/Auth/Login';
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
                <Route path="/student" element={<StudentLayout> </StudentLayout>} />

            </Routes>
        </Router>
    )
}

export default Routing;