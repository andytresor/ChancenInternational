import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Request from '../pages/request/Request';
const AuthRoute = () => {
   
    return (
        
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/request" element={<Request />} />
            </Routes>
        
    )
}

export default AuthRoute;