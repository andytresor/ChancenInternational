import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';

const AuthRoute = () => {
    return (
        
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        
    )
}

export default AuthRoute;