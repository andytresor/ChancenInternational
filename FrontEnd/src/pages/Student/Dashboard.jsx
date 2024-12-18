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

  // async function DisplayUser(){
  //   try {
  //     const res = await fetch
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  const [user, setUser] = useState("");
  const [repayment, setRepayment] = useState([]);
  const [funding, setFunding] = useState([]);
  useEffect(() => {

    // fetch user
    const fetchUser = async () => {
      const id = localStorage.getItem("userId"); // Récupérer l'ID utilisateur depuis le stockage local
      if (!id) return; // Si l'ID n'est pas disponible, renvoyer immédiatement
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/one/${id}`
        );
        setUser(response.data);
        console.log('curent user ' , response.data);

        // fetch students dept
        const res = await axios.get(`http://localhost:3000/fundings/user/${id}`);
        // const res = await axios.get("http://localhost:3000/fundings");
        const fundingData = Array.isArray(res.data) ? res.data[0]: [];
        setFunding(fundingData);
        console.log('fundings are ' , fundingData);
        fundingData.forEach(funding => { 
          console.log('Détails du financement pour un utilisateur :', funding); 
        });

        // fetch students repayments

        const responses = await axios.get(`http://localhost:3000/repayments?fundingId=${id}`);
        const repaid = responses.data;
        console.log('repaiments are ' , repaid);
        const filterRepaymentData = repaid.filter((repayment) => repayment.fundingId === Number(id));
        console.log('detail for this', id , "is" , filterRepaymentData);
        setRepayment(filterRepaymentData)

      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const fetchStudentRepayments = async (id) => {
    try{
      const response = await axios.get(`http://localhost:3000/repayments/${id}`);
      const repaid = response.data;
      console.log('repayments are ' , repaid);

    }catch(error){
      console.log("error fetching remaining amount",error);
    }
  };
  useEffect(() => {
    fetchStudentRepayments();
  } , []);

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
              <h2>Total Number Of Installments = {repayment.length}</h2>
              <h2>Number Of Installments Done = 0</h2>
              <h2>Number Of Installments Left = {repayment.length} </h2>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="one">
          <h1>TOTAL DEPT</h1>
          <p style={{ fontSize: "xx-large", fontWeight: "bolder" }}>
            Total Amount = {funding.totalDebt} XAF
          </p>
          <div className="break">
            <p>Tuition Fees : {funding.tuitionFees} XAF</p>
            <p>Financial Aid : {funding.financialAid} XAF</p>
            <p>Interest = 20% Of (Tuition Fees + Financial Aid) </p>
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
