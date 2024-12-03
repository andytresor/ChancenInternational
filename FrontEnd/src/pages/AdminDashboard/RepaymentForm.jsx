import React, { useState, useEffect } from "react";
import axios from "axios";
import useSideBar from "../../re-components/Admin/UseSidebar";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/lab";

const CreateRepaymentSchedule = () => {
    useSideBar();

    const [errors, setErrors] = useState({}); // To store validation errors
    const [fundings, setFundings] = useState([]); // To store funding options
    const [loadingFundings, setLoadingFundings] = useState(true); // Loading state
    const [selectedFunding, setSelectedFunding] = useState(""); // Selected funding ID
    const [salary, setSalary] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch funding data
    useEffect(() => {
        const fetchFundings = async () => {
            try {
                const response = await axios.get("http://localhost:3000/fundings"); // Fetch funding data
                console.log(response.data);
                setFundings(response.data);
                // Update this based on the API structure
                setLoadingFundings(false);
            } catch (error) {
                console.error("Error fetching fundings:", error);
                setLoadingFundings(false);
            }
        };

        fetchFundings();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                fundingId: Number(selectedFunding),
                salary: Number(salary),
                startDate: startDate ? startDate.toISOString() : null,
            };

            await axios.post("/repayments/schedule", payload);
            setSuccessMessage("Repayment schedule created successfully!");
            setSelectedFunding("");
            setSalary("");
            setStartDate(null);
        } catch (error) {
            console.error("Error creating repayment schedule:", error);
            setErrorMessage(
                error.response?.data?.message || "Failed to create repayment schedule."
            );
        }
    };

    return (
        <div className="main" id="main">
            <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Create Repayment Schedule
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        {Array.isArray(fundings) && fundings.length > 0 ? (
                                            <Select
                                                fullWidth
                                                value={selectedFunding}
                                                onChange={(e) => setSelectedFunding(e.target.value)}
                                                displayEmpty
                                                required
                                            >
                                                <MenuItem value="" disabled>
                                                    Select Funding
                                                </MenuItem>
                                                {fundings.map((funding) => (
                                                    <MenuItem key={funding.id} value={funding.id}>
                                                        {funding.id} -{" "}
                                                        {funding.student && funding.student.name
                                                            ? `${funding.student.name} (${funding.student.id})`
                                                            : "No student info"}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        ) : (
                                            <Typography>No fundings available</Typography>
                                        )}


                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Monthly Salary"
                                            variant="outlined"
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                            required
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* Success Snackbar */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage("")}
            >
                <Alert onClose={() => setSuccessMessage("")} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={4000}
                onClose={() => setErrorMessage("")}
            >
                <Alert onClose={() => setErrorMessage("")} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreateRepaymentSchedule;
