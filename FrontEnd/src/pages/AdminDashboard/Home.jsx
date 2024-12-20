import React, { useEffect, useState } from "react";
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
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  Chart.register(...registerables);

  const [fundings, setFundings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fundings");
        setFundings(response.data);
      } catch (error) {
        console.error("Error fetching funding data", error);
      }
    };

    fetchFundingData();
  }, []);

  // Compute total students funded
  const totalStudentsFunded = fundings.length;

  const limitedFundings = fundings.slice(0, 2);

  const handleViewAll = () => {
    navigate("/admin/funding");
  };

  const barChartData = {
    labels: ["Institution A", "Institution B", "Institution C"],
    datasets: [
      {
        label: "Total Funding Distributed",
        backgroundColor: "#4caf50",
        data: [30, 50, 20],
      },
    ],
  };

  const pieChartData = {
    labels: ["Repayments Completed", "Outstanding"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#2196f3", "#f44336"],
      },
    ],
  };

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { title: "Total Students Funded", value: totalStudentsFunded },
              { title: "Repayments in Progress", value: 80 },
              { title: "Suspended Repayments", value: 5 },
              { title: "Overdue Repayments", value: 15 },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ boxShadow: 5 }}>
                  <CardContent>
                    <Typography
                      style={{ color: "hsl(228, 12%, 61%)" }}
                      variant="h6"
                      color="textSecondary"
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        color: ["#4caf50", "#2196f3", "red", "#f44336"][index],
                        fontSize: "40px",
                        fontWeight: "900",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <div
          className="charts"
          style={{
            width: "100%",
            margin: "20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Funding Distributed Per Institution
                </Typography>
                <Bar data={barChartData} options={{ maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Repayments Completed vs. Outstanding
                </Typography>
                <Pie data={pieChartData} options={{ maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>
        </div>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fundings Overview
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Total Debt</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {limitedFundings.map((funding, index) => (
                      <TableRow key={index}>
                        <TableCell>{funding.student?.name}</TableCell>
                        <TableCell>{funding.student?.institution?.name}</TableCell>
                        <TableCell>{funding.totalDebt}</TableCell>
                        <TableCell>{funding.isActive ? "Active" : "Inactive"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                onClick={handleViewAll}
                style={{ marginTop: "20px" }}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
