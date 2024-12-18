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
  const [repayments, setRepayments] = useState([]);
  const [fundings, setFunding] = useState([]);
  useEffect(() => {
    fetchUser();
    fetchStudentRepayments();
  }, []);
  //Student
  const fetchUser = async () => {
    const id = localStorage.getItem("userId"); // Récupérer l'ID utilisateur depuis le stockage local
    if (!id) return; // Si l'ID n'est pas disponible, renvoyer immédiatement
    try {
      const response = await axios.get(`http://localhost:3000/auth/one/${id}`);
      setUser(response.data);
      console.log("current user", response.data);

      //Student dept
      const responses = await axios.get("http://localhost:3000/fundings");
      const fundingData = Array.isArray(responses.data)
        ? responses.data[0]
        : [];
      setFunding(fundingData);
      console.log("Fundings are", fundingData);

      //Student Repayments
      const res = await axios.get(
        `http://localhost:3000/repayments?fundingId=${id}`
      );
      const repaid = res.data;
      console.log("Repayments are", repaid);
      const filteredRepaymentData = repaid.filter(
        (repayment) => repayment.fundingId === Number(id)
      );
      console.log("Details for this", id, "is", filteredRepaymentData);
      console.log(repaid);

      setRepayments(filteredRepaymentData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentRepayments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/repayments/${id}`
      );
      const repaid = response.data;
      console.log("Repayments are", repaid.id);

      return repaid;
    } catch (error) {
      console.error("Error fetching remaining amount", error);
    }
  };

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
              <CircularProgressbar value={25} text="25%" />
            </div>
            <div className="text">
              <h2>Total Number Of Installments = 8</h2>
              <h2>Number Of Installments Done = 2</h2>
              <h2>Number Of Installments Left = 6</h2>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="one">
          <h1>TOTAL DEPT</h1>
          <p style={{ fontSize: "xx-large", fontWeight: "bolder" }}>
            Total Amount = {fundings.totalDebt} XAF
          </p>
          <div className="break">
            <p>Tuition Fees : {fundings.tuitionFees} XAF</p>
            <p>Financial Aid : {fundings.financialAid} XAF</p>
            <p>Interest = 20% Of (Tuition Fees + Financial Aid) </p> 52, 3
          </div>
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
