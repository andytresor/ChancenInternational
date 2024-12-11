import React, { useEffect, useState } from "react";
import useTopbar from "../../re-components/Student/useTopbar";
import { PieChart } from "@mui/x-charts/PieChart";
import "../../style/studentstyles/repayment.css";
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios"; // Axios for API calls

const Repayment = () => {
  useTopbar();

  const [fundingDetails, setFundingDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch funding details based on user ID from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:3000/fundings/${userId}`)
      .then((response) => setFundingDetails(response.data))
      .catch((err) => setError("Failed to fetch funding details"));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fundingDetails) {
    return <div>Loading...</div>;
  }

  const { repayments, totalDebt, remainingDebt, repaymentPercentage } = fundingDetails;

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green";
      case "Overdue":
        return "red";
      default:
        return "black";
    }
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
          <Typography variant="h5">Summary Of Total Debt Of {totalDebt} XAF</Typography>
          <Typography variant="h6">Remaining Debt: {remainingDebt} XAF</Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>Installment</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Due Date</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Paid On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((repayment, index) => (
                      <TableRow key={index}>
                        <TableCell>{repayment.installment}</TableCell>
                        <TableCell>{repayment.amount} XAF</TableCell>
                        <TableCell style={{ color: getStatusColor(repayment.status) }}>
                          {repayment.status}
                        </TableCell>
                        <TableCell>{repayment.dueDate}</TableCell>
                        <TableCell>{repayment.paidOn || "..."}</TableCell>
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
          {repayments
            .filter((repayment) => repayment.status === "Pending")
            .map((repayment, index) => (
              <p key={index}>
                - {repayment.installment} Installment: {repayment.amount} XAF (Due: {repayment.dueDate})
              </p>
            ))}
        </div>

        <div className="pie">
          <h1>Amount Paid VS Amount Pending</h1>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: repaymentPercentage, label: "Paid", color: "green" },
                  { id: 1, value: 100 - repaymentPercentage, label: "Pending", color: "#880808" },
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
