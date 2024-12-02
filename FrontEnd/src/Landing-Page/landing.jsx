import logo from "../assets/Images/adminImages/Chance.png";
import AboutUs from "../assets/Images/AboutUs.svg";
import steps from "../assets/Images/steps.svg";
import { Link } from "react-router-dom";
import "./landing.css";

const LandingPage = () => {
  return (
    <>
      <div className="content">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>
              CHANCEN <br />
              International
            </p>
          </div>
          <div className="links">
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <Link to="/auth/register">
                <button>Register</button>
              </Link>
            </ul>
          </div>
        </div>
        <div className="welcome">
          <div className="text">
            <h1>Investing in Futures Through <br />Education.</h1>
            <p>
              We fund your education so you can pay it forward when you succeed.
            </p>
          </div>
        </div>

        <div className="about-us">
          <img src={AboutUs} alt="about us" />
          <div className="part">
            <h1>  About Us</h1>
            <p>
              Chancen provides access to quality education that equips you for
              the modern workforce. With Income Share Agreement we invest in
              your future, and you pay us back with reinvestment when you're
              financially able. Chancen is already present in Cameroon, helping
              students achieve their educational goals. Our mission is to make
              education accessible to everyone, regardless of their financial
              background. We believe that education is a right, not a privilege,
              and we are committed to breaking down the barriers that prevent
              talented individuals from reaching their full potential. Join us
              and be part of a community that values education and equal
              opportunities.
            </p>
          </div>
        </div>

        <div className="working">
          <div className="part2">
            <h1>How It Works</h1>
            <p>- Apply for Funding: Submit your application.</p>
            <p>
              - Get Funded: Receive financial support for tuition and living
              expenses.
            </p>
            <p>
             -  Graduate & Start Your Career: Achieve your goals with our support.
            </p>
            <p>
              - Repay a Small Percentage: Help others like you by repaying 15% of
              your salary.
            </p>
          </div>
          <img src={steps} alt="steps" />
        </div>

        <div className="footer">
          <footer>
            <ul>
              <li>About Us</li>
              <li>Services</li>
            </ul>
            <hr />
            <p>Copyright © 2024 Chancen Cameroon International.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
