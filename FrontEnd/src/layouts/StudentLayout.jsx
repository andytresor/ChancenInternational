import Topbar from "../pages/Student/topbar";

const StudentLayout = ({ children }) => {
    return (
        <div>
            <header><Topbar/></header>
            <main>{children}</main>
            <footer></footer>
        </div>);
};

export default StudentLayout;