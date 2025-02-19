import React, { useState, useEffect } from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import { PieChart } from "@mui/x-charts/PieChart";
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

  useEffect(() => {
    const fetchRepayments = async () => {
      const studentId = localStorage.getItem("userId"); // Get `studentId` from local storage
      if (!studentId) return;

      try {
        const response = await axios.get(`http://localhost:3000/repayments/user/${studentId}`);
        const repaymentsWithTransactions = await Promise.all(
          response.data.map(async (repayment) => {
            const transactionResponse = await axios.get(
              `http://localhost:3000/transactions/${repayment.id}`
            );
            return { ...repayment, transactionStatus: transactionResponse.data.transaction_status };
          })
        );
        setRepayments(repaymentsWithTransactions || []);
      } catch (error) {
        console.error("Error fetching repayments:", error);
      }
    };

    fetchRepayments();
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
      return_url: `https://a543-2a0d-3344-129e-410-cd7f-8af6-c93f-4529.ngrok-free.app/student/payment/success/${repaymentId}`,
      notify_url: "https://webhook.site/d457b2f3-dd71-4f04-9af5-e2fcf3be8f34",
      repaymentId, // Include repayment ID in the request
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
                      <TableCell style={{ fontWeight: "bold" }}>Transaction Status</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Payment Date</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((repayment) => (
                      <TableRow key={repayment.id}>
                        <TableCell>{repayment.id}</TableCell>
                        <TableCell>{repayment.amount} XAF</TableCell>
                        <TableCell>{repayment.dueDate}</TableCell>
                        <TableCell
                          style={{
                            color: getStatusColor(repayment.isPaid ? "Paid" : "Overdue"),
                          }}
                        >
                          {repayment.isPaid ? "Paid" : "Overdue"}
                        </TableCell>
                        <TableCell>{repayment.transactionStatus || "N/A"}</TableCell>
                        <TableCell>{repayment.paymentDate || "N/A"}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => makePayment(repayment.amount, repayment.id)}
                          >
                            Make payment
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
      <div className="charts">
        <div className="upcoming">
          <h1>Upcoming Installments</h1>
          <p>- Fourth Installment</p>
          <p>- Amount = 90,000 XAF</p>
          <p>- Due Date = Dec 1, 2024</p>
        </div>

        <div className="pie">
          <h1>Amount Paid VS Amount Pending</h1>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 25, label: "Paid", color: "green" },
                  { id: 1, value: 75, label: "Pending", color: "#880808" },
                ],
              },
            ]}
            width={300}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Repayment;
