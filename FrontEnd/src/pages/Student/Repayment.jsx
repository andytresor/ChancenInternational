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
} from "@mui/material";
import axios from "axios";

const Repayment = () => {
  const [repayments, setRepayments] = useState([]);

  useEffect(() => {
    const fetchRepayments = async () => {
      const studentId = localStorage.getItem("userId"); // Get `studentId` from local storage
      if (!studentId) return;

      try {
        const response = await axios.get(`http://localhost:3000/repayments/user/${studentId}`);
        setRepayments(response.data || []);
        console.log("Fetched repayments:", response.data);
      } catch (error) {
        console.error("Error fetching repayments:", error);
      }
    };

    fetchRepayments();
  }, []);

  useTopbar();

  const getStatusColor = (status) => {
    return status === "Paid" ? "green" : status === "Overdue" ? "red" : "black";
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((repayment) => (
                      <TableRow key={repayment.id}>
                        <TableCell>{repayment.id}</TableCell>
                        <TableCell>{repayment.amount} XAF</TableCell>
                        <TableCell>{repayment.dueDate}</TableCell>
                        <TableCell style={{ color: getStatusColor(repayment.isPaid ? "Paid" : "Overdue") }}>
                          {repayment.isPaid ? "Paid" : "Overdue"}
                        </TableCell>
                        <TableCell>{repayment.paymentDate || "N/A"}</TableCell>
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
            width="300"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default Repayment;
