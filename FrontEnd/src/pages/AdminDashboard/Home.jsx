import React from "react";
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2"; // Assuming Chart.js is used
import useSideBar from "../../re-components/Admin/UseSidebar";
import { Chart, registerables } from 'chart.js';

const Home = () => {
  // Register all necessary components
  Chart.register(...registerables);

  useSideBar();
  // Dummy data

  // Dummy data
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

  const overduePayments = [
    { name: "John Doe", institution: "Institution A", amount: "$900", lastPayment: "2024-10-15" },
    { name: "Jane Smith", institution: "Institution B", amount: "$700", lastPayment: "2024-10-10" },
  ];

  const cardStyles = [
    { color: '#4caf50', fontSize: '40px', fontWeight: "900" }, // Example color and size for the first card
    { color: '#2196f3', fontSize: '40px', fontWeight: "900" }, // Example color and size for the second card
    { color: 'red', fontSize: '40px', fontWeight: "900" }, // Example color and size for the third card
    { color: '#f44336', fontSize: '40px', fontWeight: "900" }, // Example color and size for the fourth card
  ];

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        {/* Metrics Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { title: "Total Students Funded", value: 120 },
              { title: "Repayments in Progress", value: 80 },
              { title: "Suspended Repayments", value: 5 },
              { title: "Overdue Repayments", value: 15 },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ boxShadow: 5 }}>
                  <CardContent>
                    <Typography style={{color: "hsl(228, 12%, 61%)"}} variant="h6" color="textSecondary">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{
                        color: cardStyles[index].color,
                        fontSize: cardStyles[index].fontSize,
                        fontWeight: cardStyles[index].fontWeight,
                        fontFamily: 'Poppins, sans-serif' // Set the font family to Poppins
                      }}>
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Charts Section */}
        <div className="charts" style={{ width: "100%", margin: "20px", display: "flex", justifyContent: "space-evenly" }}>
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

        {/* Overdue Payments Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography style={{color: "hsl(228, 85%, 63%)"}} variant="h6" gutterBottom>
                Overdue Payments
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Overdue Amount</TableCell>
                      <TableCell>Last Payment Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {overduePayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.name}</TableCell>
                        <TableCell>{payment.institution}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.lastPayment}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View Details
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

export default Home;
