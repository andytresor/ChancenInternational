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
import { useNavigate } from "react-router-dom";

const RepaymentsPage = () => {
  useSideBar();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [repayments, setRepayments] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [students, setStudents] = useState({});
  const [repaidAmount, setRepaidAmount] = useState([])
  const [institutions,setInstituton] = useState({})

  useEffect(() => {
    fetchRepayments();
  }, []);
 
  const fetchRepayments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fundings");
      const fundingData = Array.isArray(response.data) ? response.data : [];
      setRepayments(fundingData);
      console.log("Fundings are", fundingData);
      
      const studentInstitutionPromises = fundingData.map(async (funding) => {
        try {
          
            if (!funding.studentId) {
              console.log(`Funding ${funding.id} has no studentId.`);
              return null; // Skip if studentId is missing
            }
          // Fetch student details
          const studentResponse = await axios.get(
            `http://localhost:3000/students/${funding.studentId}`
          );
          const student = studentResponse.data;
          console.log("Students are", student);
          
  
          // Fetch institution details
          if (student.institutionId) {
            const institutionResponse = await axios.get(
              `http://localhost:3000/institutions/${student.institutionId}`
            );
            const institution = institutionResponse.data;
  
            return {
              studentId: funding.studentId,
              studentName: student.name,
              institutionName: institution.name,
            };
          }
          return {
            studentId: funding.studentId,
            studentName: student.name,
            institutionName: "Not Available",
          };
        } catch (error) {
          console.error(
            `Error fetching details for funding ${funding.id}:`,
            error
          );
          return null;
        }
      });
  
      const studentInstitutionDetails = await Promise.all(studentInstitutionPromises);
  
      // Create mappings for student names and institutions
      const studentMap = {};
      const institutionMap = {};
      studentInstitutionDetails.forEach((detail) => {
        if (detail) {
          studentMap[detail.studentId] = detail.studentName;
          institutionMap[detail.studentId] = detail.institutionName;
        }
      });
  
      setStudents(studentMap);
      setInstituton(institutionMap);
     
         //Repaid Amount
    const amountRepaid = response.data.map(repayment =>
     fetchRepaidAmount(repayment.id)
    );
     const repaidAmount = await Promise.all(amountRepaid)
     console.log('repaid amount', repaidAmount);
     setRepaidAmount(repaidAmount)
     
  } catch (error) {
    console.error("Error fetching repayments:", error);
    setRepayments([]); // Fallback to empty array on error
  }
  };
  

  // const fetchStudentDetails = async (id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/students/${id}`);
  //     return response.data; // This will return the student object
  //   } catch (error) {
  //     console.error("Error fetching student details:", error);
  //     return null; // Return null in case of error
  //   }
  // };
  const fetchRepaidAmount = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/fundings/${id}/remaining-debt`)
      const repaid = response.data
     return repaid
    } catch (error) {
      console.error("Error fetching remaining amount", error)
    }
  }

  const fetchRepaymentDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/fundings/${id}`);

      setSelectedRecord(response.data);
    } catch (error) {
      console.error("Error fetching repayment details:", error);
    }
  };

  const handleViewHistory = (record) => {
    fetchRepaymentDetails(record.id);
    setHistoryModalOpen(true);
  };

  const filteredRepayments = Array.isArray(repayments)
    ? repayments.filter((record) => {
        return (
          (filterStatus === "All" || record.status === filterStatus) &&
          record.name &&
          record.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id) {
      console.log(id);
    } else {
      console.log("id not found");
    }
    navigate(`/admin/details/${id}`);
  };

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        {/* Metrics Summary */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Replace static values with dynamic metrics fetched via API */}
            {[
              {
                title: "Total Monthly Repayments Collected",
                value: "$10,000", // Replace with dynamic value from API
              },
              {
                title: "Number of Overdue Payments",
                value: repayments.filter((r) => r.status === "Overdue").length, // Calculate dynamically
              },
              {
                title: "Number of Suspended Payments",
                value: repayments.filter((r) => r.status === "Suspended")
                  .length, // Calculate dynamically
              },
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
            {["All", "In Progress", "Suspended", "Overdue"].map(
              (status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              )
            )}
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
                      <TableCell>Total Debt</TableCell>
                      <TableCell>Amount Repaid</TableCell>
                      <TableCell>Remaining Debt</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repayments.map((record, index) => (
                      <TableRow key={index}>
                         <TableCell>{students[record.studentId] || "Loading..."}</TableCell>
                         <TableCell>{institutions[record.studentId] || "Loading..."}</TableCell>
                        <TableCell>{record.totalDebt}</TableCell>
                        <TableCell>{record.amountRepaid}</TableCell> 
                        <TableCell>{repaidAmount[index] !== undefined ? repaidAmount[index] : "Loading..."}</TableCell>
                        <TableCell>{record.isActive ? "In Progress" : "Inactive"}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleClick(record.id)}
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
      </Grid>
    </div>
  );
};

export default RepaymentsPage;
