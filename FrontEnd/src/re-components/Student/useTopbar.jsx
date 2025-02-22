// useSidebar.js
import { useEffect } from 'react';


const useTopbar = () => {
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

        return () => {
            if (toggle) {
                toggle.removeEventListener('click', showSidebar );
            }
        };
    }, []);
};

export default useTopbar;
