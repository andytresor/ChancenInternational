import React, { useEffect, useState } from 'react';
import logo from "../../assets/Images/adminImages/Chance.png";
import '../../style/studentstyles/topbar.css'; // Ensure you have the necessary CSS
import { NavLink } from 'react-router-dom';
import axios from "axios";


const Topbar = () => {

    const [user, setUser] = useState("");

useEffect(() => {
  const fetchUser = async () => {
    const id = localStorage.getItem('userId')
    if (!id) return; 
      try {
        const response = await axios.get(`http://localhost:3000/auth/one/${id}`);
        setUser(response.data)
      } catch (error) {
        console.log(error); 
      }
  }
  fetchUser();
}, []);

    const [activeLink, setActiveLink] = useState('Student-Dashboard'); // Default active link

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }; 

    useEffect(() => {
        const sidebarLinks = document.querySelectorAll('.sidebar__list a');

        const linkColor = function () {
            sidebarLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        };

        sidebarLinks.forEach(l => l.addEventListener('click', linkColor));

        // Cleanup event listeners on component unmount
        return () => {
            sidebarLinks.forEach(l => l.removeEventListener('click', linkColor));
        };
    }, []);

    useEffect(() => {
        const themeButton = document.getElementById('theme-button');
        const darkTheme = 'dark-theme';
        const iconTheme = 'ri-sun-fill';

        const selectedTheme = localStorage.getItem('selected-theme');
        const selectedIcon = localStorage.getItem('selected-icon');

        const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
        const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill';

        if (selectedTheme) {
            document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
            themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme);
        }

        themeButton.addEventListener('click', () => {
            document.body.classList.toggle(darkTheme);
            themeButton.classList.toggle(iconTheme);
            localStorage.setItem('selected-theme', getCurrentTheme());
            localStorage.setItem('selected-icon', getCurrentIcon());
        });

        // Cleanup event listener on component unmount
        return () => {
            themeButton.removeEventListener('click', () => {
                document.body.classList.toggle(darkTheme);
                themeButton.classList.toggle(iconTheme);
                localStorage.setItem('selected-theme', getCurrentTheme());
                localStorage.setItem('selected-icon', getCurrentIcon());
            });
        };
    }, []);

    return (
        <div>
            <header className="header" id="header">
                <div className="header__container">
                    <a href="#" className="header__logo">
                        <i className="ri-cloud-fill"></i>
                        <span>ChanceInternational</span>
                    </a>
                    <button className="header__toggle" id="header-toggle">
                        <i className="ri-menu-line"></i>
                    </button>
                </div>
            </header>

            <nav className="sidebar" id="sidebar">
                <div className="sidebar__container">
                    <div className="sidebar__user">
                        <div className="sidebar__img">
                        <img src={logo} alt="image" />
                        </div>
                        <div className="sidebar__info">
                            <h3>{user.name}</h3>
                            <span style={{color: "hsl(228, 12%, 61%)"}}>{user.email}</span>
                        </div>
                    </div>

                    <div className="sidebar__content">
                        <div>
                            <h3 className="sidebar__title">MANAGE</h3>
                            <div className="sidebar__list">
                                
                                <NavLink to="/student/student-dashboard"
                                className={`sidebar__link ${activeLink === 'Student-Dashboard' ? 'active-link' : ''}`}
                                onClick={() => handleLinkClick('Student-Dashboard')}  >
                                    <i className="ri-pie-chart-2-fill"></i>
                                  <span> Student-Dashboard</span>
                                    </NavLink>
                                  <NavLink to="/student/student-repayment"
                                className={`sidebar__link ${activeLink === 'Repayment' ? 'active-link' : ''}`}
                                onClick={() => handleLinkClick('Repayment')}>
                                  <i className="ri-bar-chart-box-fill"></i>
                               <span> Repayment</span>
                                    </NavLink>
                                 <NavLink to="/student/student-profile"
                               className={`sidebar__link ${activeLink === 'Profile' ? 'active-link' : ''}`}
                               onClick={() => handleLinkClick('Profile')}>
                                 <i className="ri-arrow-up-down-line"></i>
                                  <span>Profile</span>
                                    </NavLink>

                            </div>
                        </div>

                    </div>

                    <div className="sidebar__actions">
                        <button>
                            <i className="ri-moon-clear-fill sidebar__link sidebar__theme" id="theme-button">
                                <span>Theme</span>
                            </i>
                        </button>
                        <button className="sidebar__link">
                            <i className="ri-logout-box-r-fill"></i>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Topbar; 