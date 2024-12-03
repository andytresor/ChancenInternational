import React, { useState, useEffect } from "react";
import axios from "axios";
import useSideBar from "../../re-components/Admin/UseSidebar";
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
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RepaymentsPage = () => {
  useSideBar();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [repayments, setRepayments] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);

  useEffect(() => {
    fetchRepayments();
  }, []);

  const fetchRepayments = async () => {
    try {
      const response = await axios.get("/repayments");
      setRepayments(response.data);
    } catch (error) {
      console.error("Error fetching repayments:", error);
    }
  };

  const fetchRepaymentDetails = async (id) => {
    try {
      const response = await axios.get(`/repayments/${id}`);
      setSelectedRecord(response.data);
    } catch (error) {
      console.error("Error fetching repayment details:", error);
    }
  };

  const handleViewHistory = (record) => {
    fetchRepaymentDetails(record.id);
    setHistoryModalOpen(true);
  };

  const filteredRepayments = repayments.filter((record) => {
    return (
      (filterStatus === "All" || record.status === filterStatus) &&
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        {/* Metrics Summary */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Replace static values with dynamic metrics fetched via API */}
            {[
              { title: "Total Monthly Repayments Collected", value: "$10,000" },
              { title: "Number of Overdue Payments", value: 5 },
              { title: "Number of Suspended Payments", value: 3 },
            ].map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      {metric.title}
                    </Typography>
                    <Typography variant="h4">{metric.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            fullWidth
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
          >
            {["All", "In Progress", "Suspended", "Overdue"].map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Repayment Records Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Monthly Salary</TableCell>
                      <TableCell>Installments Paid</TableCell>
                      <TableCell>Remaining Debt</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRepayments.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.institution}</TableCell>
                        <TableCell>{record.salary}</TableCell>
                        <TableCell>{record.installmentsPaid}</TableCell>
                        <TableCell>{record.remainingDebt}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewHistory(record)}
                          >
                            View History
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

        {/* View History Modal */}
        <Dialog open={isHistoryModalOpen} onClose={() => setHistoryModalOpen(false)}>
          <DialogTitle>Repayment History</DialogTitle>
          <DialogContent>
            {selectedRecord && (
              <>
                <Typography variant="subtitle1">Name: {selectedRecord.name}</Typography>
                <Typography variant="subtitle1">Institution: {selectedRecord.institution}</Typography>
                <Typography variant="subtitle1">Amount: {selectedRecord.amount}</Typography>
                <Typography variant="subtitle1">Due Date: {selectedRecord.dueDate}</Typography>
                <Typography variant="subtitle1">Status: {selectedRecord.isPaid ? "Paid" : "Unpaid"}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHistoryModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default RepaymentsPage;
