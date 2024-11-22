import React, { useState } from "react";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [filterInstitution, setFilterInstitution] = useState("All");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isAddFundingModalOpen, setAddFundingModalOpen] = useState(false);

    // Dummy data for students
    const students = [
        { name: "John Doe", institution: "Institution A", debt: "$12,000", completed: "50%", status: "In Progress" },
        { name: "Jane Smith", institution: "Institution B", debt: "$15,000", completed: "30%", status: "Suspended" },
        { name: "Alice Johnson", institution: "Institution A", debt: "$10,000", completed: "70%", status: "Completed" },
    ];

    const institutions = ["All", "Institution A", "Institution B"];

    // Filtered and searched student list
    const filteredStudents = students.filter((student) => {
        return (
            (filterInstitution === "All" || student.institution === filterInstitution) &&
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Handlers for modals
    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setDetailModalOpen(true);
    };

    const handleAddFunding = () => {
        setAddFundingModalOpen(true);
    };

    return (
        <div className="main" id="main">
            <Grid container spacing={4} style={{ padding: "20px" }}>
                {/* Page Title */}
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Students List
                    </Typography>
                </Grid>

                {/* Search and Filter Section */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search by Name or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Select
                        fullWidth
                        value={filterInstitution}
                        onChange={(e) => setFilterInstitution(e.target.value)}
                        displayEmpty
                    >
                        {institutions.map((institution, index) => (
                            <MenuItem key={index} value={institution}>
                                {institution}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleAddFunding}>
                        Add Funding
                    </Button>
                </Grid>

                {/* Students Table */}
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
                                            <TableCell>Repayments Completed (%)</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredStudents.map((student, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.institution}</TableCell>
                                                <TableCell>{student.debt}</TableCell>
                                                <TableCell>{student.completed}</TableCell>
                                                <TableCell>{student.status}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleViewDetails(student)}
                                                    >
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

                {/* View Details Modal */}
                <Dialog open={isDetailModalOpen} onClose={() => setDetailModalOpen(false)}>
                    <DialogTitle>Student Details</DialogTitle>
                    <DialogContent>
                        {selectedStudent && (
                            <>
                                <Typography variant="subtitle1">Name: {selectedStudent.name}</Typography>
                                <Typography variant="subtitle1">Institution: {selectedStudent.institution}</Typography>
                                <Typography variant="subtitle1">Total Debt: {selectedStudent.debt}</Typography>
                                <Typography variant="subtitle1">Repayments Completed: {selectedStudent.completed}</Typography>
                                <Typography variant="subtitle1">Status: {selectedStudent.status}</Typography>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDetailModalOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Add Funding Modal */}
                <Dialog open={isAddFundingModalOpen} onClose={() => setAddFundingModalOpen(false)}>
                    <DialogTitle>Add Funding</DialogTitle>
                    <DialogContent>
                        <TextField fullWidth variant="outlined" label="Funding Amount" style={{ marginBottom: "15px" }} />
                        <TextField fullWidth variant="outlined" label="Funding Description" multiline rows={3} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAddFundingModalOpen(false)}>Cancel</Button>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    );
};

export default Students;
