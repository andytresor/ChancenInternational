import { useEffect, useState } from "react";
import React from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import CustomCard from "../../re-components/Student/card";
import "../../style/studentstyles/dashboard.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const Dashboard = () => {
  useTopbar();

  const dataset = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 0 },
  ];

  const [user, setUser] = useState("");
  const [repayment, setRepayment] = useState([]);
  const [funding, setFunding] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      console.log(userId);
      
      if (!userId) return;

      try {
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:3000/auth/one/${userId}`);
        setUser(userResponse.data);
        console.log("Current user:", userResponse.data);

        // Fetch funding data
        const fundingResponse = await axios.get(`http://localhost:3000/fundings/user/${userId}`);
        const fundingData = Array.isArray(fundingResponse.data) ? fundingResponse.data : [];
        setFunding(fundingData);
        console.log("Fundings are:", fundingData);

        // Fetch repayments for each funding
        const allRepayments = [];
        for (const funding of fundingData) {
          const repaymentResponse = await axios.get(
            `http://localhost:3000/repayments?fundingId=${funding.id}`
          );
          const repaymentData = Array.isArray(repaymentResponse.data) ? repaymentResponse.data : [];
          allRepayments.push(...repaymentData);
        }
        setRepayment(allRepayments);
        console.log("Repayments are:", allRepayments);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main" id="main">
      <div className="head">
        <h1> Welcome {user.name} </h1>
        <p> Total Overview </p>
      </div>

      <div className="ally">
        <CustomCard className="two">
          <h1>REPAYMENT</h1>
          <div className="content">
            <div style={{ width: "10vw", height: "10vh" }}>
              <CircularProgressbar
                value={repayment.filter((r) => r.isPaid).length / repayment.length * 100 || 0}
                text={`${Math.round(
                  (repayment.filter((r) => r.isPaid).length / repayment.length) * 100 || 0
                )}%`}
              />
            </div>
            <div className="text">
              <h2>Total Number Of Installments = {repayment.length}</h2>
              <h2>Number Of Installments Done = {repayment.filter((r) => r.isPaid).length}</h2>
              <h2>
                Number Of Installments Left ={" "}
                {repayment.length - repayment.filter((r) => r.isPaid).length}
              </h2>
            </div>
          </div>
        </CustomCard>

        <CustomCard className="one">
          <h1>TOTAL DEBT</h1>
          {funding.length > 0 ? (
            <>
              <p style={{ fontSize: "xx-large", fontWeight: "bolder" }}>
                Total Amount = {funding.reduce((sum, fund) => sum + Number(fund.totalDebt || 0), 0)} XAF
              </p>
              <div className="break">
                {funding.map((fund, index) => (
                  <div key={index}>
                    <p>Tuition Fees: {fund.tuitionFees} XAF</p>
                    <p>Financial Aid: {fund.financialAid} XAF</p>
                    <p>Interest = 20% Of (Tuition Fees + Financial Aid)</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No funding data available.</p>
          )}
        </CustomCard>
      </div>

      <div className="line">
        <h2 style={{ fontSize: "xx-large" }}>Payment Flow</h2>
        <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: "x" }]}
          series={[{ dataKey: "y" }]}
          height={400}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
