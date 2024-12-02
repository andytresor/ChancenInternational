import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/AdminDashboard/Home';
import Students from '../pages/AdminDashboard/Students';
import Repayments from '../pages/AdminDashboard/Repayments';
import Notifications from '../pages/AdminDashboard/Notifications';
import Settings from '../pages/AdminDashboard/Settings';

const AdminRoute = () => {
    
    return (
        <AdminLayout>
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/repayments" element={<Repayments />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoute;