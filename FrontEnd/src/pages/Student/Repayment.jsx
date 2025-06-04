import React, { useState, useEffect } from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import "../../style/studentstyles/repayment.css";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";

const Repayment = () => {
  useTopbar();
  const [repayments, setRepayments] = useState([]);

  const fetchRepayments = async () => {
    const studentId = localStorage.getItem("userId"); // Get `studentId` from local storage
    if (!studentId) return;
    
    try {
      const response = await axios.get(`http://localhost:3000/repayments/user/${studentId}`);
      setRepayments(response.data);
    } catch (error) {
      console.error("Error fetching repayments:", error);
    }
  };
  useEffect(() => {

    fetchRepayments();
    // Set up an interval to fetch repayments every 10 seconds
  const intervalId = setInterval(fetchRepayments, 10000);

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId)
  }, []);

  function generateNumericTransactionId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10000);
    return timestamp.toString() + randomPart.toString().padStart(4, "0");
  }

  const baseURL = "https://gateway.payunit.net/api";

  const makePayment = async (amount, repaymentId) => {
    const transactionId = generateNumericTransactionId();
    const payload = {
      total_amount: amount,
      currency: "XAF",
      transaction_id: transactionId,
      payment_country: "CM",
      return_url: `https://c9f5-2a0d-3344-1550-f510-265-f7a7-98ab-d355.ngrok-free.app/student/payment/success/${repaymentId}`,
      notify_url: "https://webhook.site/d457b2f3-dd71-4f04-9af5-e2fcf3be8f34",
      repaymentId,
    };
  
    try {
      // Send the request to your backend
      const response = await axios.post("http://localhost:3000/transactions/initialize", payload);
  
      if (response?.data?.data?.transaction_url) {
        console.log("Payment initialized:", response.data);
        // Redirect to the payment URL
        window.location.href = response.data.data.transaction_url;
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
  
      // Handle duplicate payment attempt error
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "A payment has already been initiated for this repayment.");
      } else {
        alert("Payment initialization failed. Please try again later.");
      }
    }
  };
  
  

  const getStatusColor = (status) => {
    return status === "Paid"
      ? "green"
      : status === "Overdue"
        ? "red"
        : "black";
  };

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        <Grid
          item
          xs={12}
          style={{
            background: "linear-gradient(to right, #1976d2, #64b5f6)",
            color: "white",
            height: "25vh",
            borderRadius: "1rem",
            padding: "3rem",
          }}
        >
          <Typography variant="h3" width="100%" gutterBottom>
            Repayments
          </Typography>
          <Typography variant="h5">Summary Of Total Debt</Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>Installment ID</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Due Date</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Payment Date</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((repayment) => (
                      <TableRow key={repayment.id}>
                        <TableCell>{repayment.id}</TableCell>
                        <TableCell>{repayment.amount} XAF</TableCell>
                        <TableCell>{new Date(repayment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell
                          style={{ color:repayment.isPaid ? "green" : "red" }}>
                          {repayment.isPaid ? "Paid" : "Pending"}
                        </TableCell>
                        <TableCell>{repayment.paymentDate ? new Date(repayment.paymentDate).toLocaleDateString() : 'N/A'} </TableCell>
                        <TableCell>
                        <Button
                        onClick={() => makePayment(repayment.amount, repayment.id)}
                        disabled={repayment.isPaid}
                        style={{ "backgroundColor":"#1976d2","color":"white"}}
                       >
                       {repayment.isPaid ? 'Paid' : 'Pay Now'}
                     </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Repayment;
