import { NavLink } from 'react-router-dom';
import '../../style/studentstyles/topbar.css';

const Topbar = () => {
    return (
        <>
        <div className="topbar">
            
            <div className="links">
                <ul>
                    <li><NavLink to='/student-dashboard' activeClassName='active'>Dashboard</NavLink></li>
                    <li><NavLink to='/student-repayment' activeClassName='active'>Repayments</NavLink></li>
                    <li><NavLink to='/student-profile' activeClassName='active'>Profile</NavLink></li>
                    <NavLink to='/student-profile'><img src="../../src/assets/Images/studentImages/map.jpeg" alt="image" /></NavLink>
                </ul>
            </div>
        </div>
        </>
    );
}

export default Topbar;