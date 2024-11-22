import React, { useEffect, useState } from 'react';
import logo from "../../assets/Images/adminImages/Chance.png";
import '../../style/adminstyles/sideBar.css'; // Ensure you have the necessary CSS

const Sidebar = () => {

    const [activeLink, setActiveLink] = useState('dashboard'); // Default active link

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        // Set the active link based on the current pathname
        if (location.pathname === '/students') {
            setActiveLink('students');
        } else if (location.pathname === '/') {
            setActiveLink('home');
        } else if (location.pathname === '/repayments') {
            setActiveLink('repayments');
        } else if (location.pathname === '/statistics') {
            setActiveLink('statistics');
        }else if (location.pathname === '/notifications') {
            setActiveLink('notifications');
        }else if (location.pathname === '/settings') {
            setActiveLink('settings');
        }
    }, [location.pathname]); // Run the effect when the pathname changes


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
                            <h3>Andy Shelby</h3>
                            <span style={{color: "hsl(228, 12%, 61%)"}}>andyshelby123@email.com</span>
                        </div>
                    </div>

                    <div className="sidebar__content">
                        <div>
                            <h3 className="sidebar__title">MANAGE</h3>
                            <div className="sidebar__list">
                                <a
                                    href="/"
                                    className={`sidebar__link ${activeLink === 'home' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('dashboard')}
                                >
                                    <i className="ri-pie-chart-2-fill"></i>
                                    <span>Dashboard</span>
                                </a>
                                <a
                                    href="/students"
                                    className={`sidebar__link ${activeLink === 'students' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('wallet')}
                                >
                                    <i className="ri-wallet-3-fill"></i>
                                    <span>Students</span>
                                </a>
                                <a
                                    href="/repayments"
                                    className={`sidebar__link ${activeLink === 'repayments' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('statistics')}
                                >
                                    <i className="ri-bar-chart-box-fill"></i>
                                    <span>Repayments</span>
                                </a>
                                <a
                                    href="#"
                                    className={`sidebar__link ${activeLink === 'transactions' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('transactions')}
                                >
                                    <i className="ri-arrow-up-down-line"></i>
                                    <span>Recent Transactions</span>
                                </a>
                            </div>
                        </div>

                        <div><i className="ri-settings-3-fill"></i>
                            <h3 className="sidebar__title">SETTINGS</h3>
                            <div className="sidebar__list">
                                <a
                                    href="/notifications"
                                    className={`sidebar__link ${activeLink === 'notifications' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('transactions')}
                                >
                                    <i className="ri-notification-2-fill"></i>
                                    <span>Notifications</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-mail-unread-fill"></i>
                                    <span>My Messages</span>
                                </a>
                                <a
                                    href="/settings"
                                    className={`sidebar__link ${activeLink === 'settings' ? 'active-link' : ''}`}
                                    onClick={() => handleLinkClick('transactions')}
                                >
                                    <i className="ri-arrow-up-down-line"></i>
                                    <span>Settings</span>
                                </a>
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

export default Sidebar;