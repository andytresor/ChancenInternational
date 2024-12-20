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
  const [repayments, setRepayment] = useState([]);
  const [totalDebt, setTotalDebt] = useState(null); // To store total debt from funding
 
  useEffect(() => {
    const fetchRepayment = async () => {
      const id = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis le stockage local
      console.log('id is' , id)
      if (!id) return;  // Si l'ID n'est pas disponible, renvoyer immédiatement
      try {
        const response = await axios.get(`http://localhost:3000/repayments/user/${id}`);

        const repaymentData = Array.isArray(response.data) ? response.data : [];
        console.log("Repayments are",repaymentData);

        setRepayment(repaymentData);

        if (repaymentData.length > 0) {
          const fundingId = repaymentData[0].fundingId; // Get fundingId from the first repayment
          const fundingResponse = await axios.get(
            `http://localhost:3000/fundings/${fundingId}`
          );
          setTotalDebt(fundingResponse.data.totalDebt); // Extract totalDebt from funding
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepayment();
  }, []);
  useTopbar();

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green"; // Color for paid status
      case "Overdue":
        return "red"; // Color for overdue status
      default:
        return "black"; // Default color for other statuses
    }
  };

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        {/* Page Title */}
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
          <Typography variant="h5">
            Summary Of Total Dept Of {totalDebt} XAF
          </Typography>
        </Grid>

        {/* Students Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Installment Id
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Amount
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Due Date
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Is Paid
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Payment Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((repayment, index) => (
                      <TableRow key={index}>
                        <TableCell>{repayment.id}</TableCell>
                        <TableCell>{repayment.amount}</TableCell>
                        <TableCell> {repayment.dueDate} </TableCell>
                        <TableCell>{repayment.isPaid ? "Paid" : "Pending"}</TableCell>
                        <TableCell>{repayment.paymentDate || "Loading..."}</TableCell>
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
          <p> - Amount = 90,000 XAF</p>
          <p> - Due Date = Dec 1, 2024</p>
        </div>

        <div className="pie">
          <h1>Amount Paid VS Amount Pending</h1>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 25, label: " Paid", color: "green" },
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
