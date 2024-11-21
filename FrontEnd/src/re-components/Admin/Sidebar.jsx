import React, { useEffect } from 'react';
import '../../style/adminstyles/sideBar.css'; // Ensure you have the necessary CSS

const Sidebar = () => {
    useEffect(() => {
        const toggleId = 'header-toggle';
        const sidebarId = 'sidebar';
        const headerId = 'header';
        const mainId = 'main';

        const toggle = document.getElementById(toggleId);
        const sidebar = document.getElementById(sidebarId);
        const header = document.getElementById(headerId);
        const main = document.getElementById(mainId);

        const showSidebar = () => {
            sidebar.classList.toggle('show-sidebar');
            header.classList.toggle('left-pd');
            main.classList.toggle('left-pd');
        };

        if (toggle && sidebar && header && main) {
            toggle.addEventListener('click', showSidebar);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (toggle) {
                toggle.removeEventListener('click', showSidebar);
            }
        };
    }, []);

    useEffect(() => {
        const sidebarLinks = document.querySelectorAll('.sidebar__list a');

        const linkColor = function() {
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
                        <span>Cloud</span>
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
                            <img src="assets/img/perfil.png" alt="image" />
                        </div>
                        <div className="sidebar__info">
                            <h3>Rix Methil</h3>
                            <span>rix123@email.com</span>
                        </div>
                    </div>

                    <div className="sidebar__content">
                        <div>
                            <h3 className="sidebar__title">MANAGE</h3>
                            <div className="sidebar__list">
                                <a href="#" className="sidebar__link active-link">
                                    <i className="ri-pie-chart-2-fill"></i>
                                    <span>Dashboard</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri -wallet-3-fill"></i>
                                    <span>My Wallet</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-calendar-fill"></i>
                                    <span>Calendar</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-arrow-up-down-line"></i>
                                    <span>Recent Transactions</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-bar-chart-box-fill"></i>
                                    <span>Statistics</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="sidebar__title">SETTINGS</h3>
                            <div className="sidebar__list">
                                <a href="#" className="sidebar__link">
                                    <i className="ri-settings-3-fill"></i>
                                    <span>Settings</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-mail-unread-fill"></i>
                                    <span>My Messages</span>
                                </a>
                                <a href="#" className="sidebar__link">
                                    <i className="ri-notification-2-fill"></i>
                                    <span>Notifications</span>
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

            <main className="main container" id="main">
                <h1>Sidebar Menu</h1>
            </main>
        </div>
    );
};

export default Sidebar;