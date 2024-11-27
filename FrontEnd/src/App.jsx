import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './routes/admin_route';
import StudentRoute from './routes/student_route'; // Make sure this is defined correctly
import AuthRoute from './routes/auth_route'; // Make sure this is defined correctly

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AdminRoute />} />
        <Route path="/student/*" element={<StudentRoute />} />
        <Route path="/auth" element={<AuthRoute />} />

      </Routes>
    </Router>
  );
}

export default App;