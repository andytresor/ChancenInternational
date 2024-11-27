import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Regist from '../pages/Auth/Regist';
const AuthRoute = () => {
    return (
        
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Regist />} />
            </Routes>
        
    )
}

export default AuthRoute;