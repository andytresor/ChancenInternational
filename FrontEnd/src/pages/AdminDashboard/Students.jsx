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

const Students = () => {
  useSideBar();

  const [students, setStudents] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInstitution, setFilterInstitution] = useState("All");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchInstitutions();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setStudents(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/institutions");
      setInstitutions(["All", ...response.data.map((inst) => inst.name)]);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterInstitution(e.target.value);

  const openUpdateModal = (student) => {
    setUpdateData(student);
    setUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/students/${updateData.id}`, updateData);
      fetchStudents();
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesInstitution =
      filterInstitution === "All" || student.institution.name === filterInstitution;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesInstitution && matchesSearch;
  });

  return (
    <div className="main" id="main">
      <Grid container spacing={4} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Students List
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Select
            fullWidth
            value={filterInstitution}
            onChange={handleFilterChange}
            displayEmpty
          >
            {institutions.map((institution, index) => (
              <MenuItem key={index} value={institution}>
                {institution}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Total Debt</TableCell>
                      <TableCell>Repayment %</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name || "N/A"}</TableCell>
                        <TableCell>{student.institution?.name || "N/A"}</TableCell>
                        <TableCell>{student.funding?.totalDebt || "N/A"} FCFA</TableCell>
                        <TableCell>
                          {student.funding?.totalDebt > 0
                            ? ((
                                (student.funding.amountRepaid || 0) /
                                student.funding.totalDebt
                              ) * 100).toFixed(2)
                            : "0.00"}
                          %
                        </TableCell>
                        <TableCell>{student.isRepaymentActive ? "Active" : "Inactive"}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => openUpdateModal(student)}
                          >
                            Update
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

        <Dialog open={isUpdateModalOpen} onClose={() => setUpdateModalOpen(false)}>
          <DialogTitle>Update Student</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              name="name"
              value={updateData.name || ""}
              onChange={handleUpdateChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              value={updateData.email || ""}
              onChange={handleUpdateChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Salary"
              name="salary"
              value={updateData.salary || ""}
              onChange={handleUpdateChange}
            />
            <Select
              fullWidth
              margin="dense"
              name="institution"
              value={updateData.institution?.name || ""}
              onChange={(e) =>
                setUpdateData((prevData) => ({
                  ...prevData,
                  institution: { ...prevData.institution, name: e.target.value },
                }))
              }
            >
              {institutions.map((inst, index) => (
                <MenuItem key={index} value={inst}>
                  {inst}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubmit} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Students;
