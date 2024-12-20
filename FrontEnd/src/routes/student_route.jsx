import { Route, Routes } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import Dashboard from '../pages/Student/Dashboard';
import Repayment from  '../pages/Student/Repayment';
import PaymentConfirmation from '../pages/Student/PaymentConfirmation';  // Make sure this is defined correctly
import Profile from '../pages/Student/Profile';

const StudentRoute = () => {
    return (
        <StudentLayout>
            <Routes>
                <Route path="/student-dashboard" element={<Dashboard/>} />
                <Route path="/student-repayment" element={<Repayment/>} />
                <Route path="/student-profile" element={<Profile/>} />
                <Route path="/payment/success/:transactionId" element={<PaymentConfirmation />} />
            </Routes>
        </StudentLayout> 
    )
}

export default StudentRoute;