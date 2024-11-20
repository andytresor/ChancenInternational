import Sidebar from "../re-components/Admin/Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div>
             <Sidebar />
            <main>{children}</main>
        </div>

    );
};

export default AdminLayout;