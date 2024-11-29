import Topbar from "../re-components/Student/topbar";


const StudentLayout = ({ children }) => {
    return (
        <div className="admin-layout">
        <Topbar/>
        <div className="main-content">
            {children}
        </div>
    </div>
        );
};

export default StudentLayout;