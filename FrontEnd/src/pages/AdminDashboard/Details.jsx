import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";

const Details = () => {
  useSideBar();

  const { id } = useParams(); // Extract the id from the URL
  const [details, setDetails] = useState([]);
  const [student, setStudent] = useState(null); // State to store student details
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/repayments?fundingId=${id}`);
      const repaymentData = Array.isArray(response.data) ? response.data : [];
      const filteredFundingData = repaymentData.filter(repayment => repayment.fundingId === Number(id));

      // Extract the student from the first repayment (assuming all repayments are for the same student)
      const studentData = filteredFundingData.length > 0 ? filteredFundingData[0]?.student : null;

      setDetails(filteredFundingData);
      setStudent(studentData);
      setIsLoading(false);

    } catch (err) {
      setError("Failed to load details");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main" id="main">
      <h2>
        {student ? (
          <>
            <span className="student-name" style={{ color: "#3295f8", fontWeight: "bold", fontSize: "1.5rem" }}>{student.name}'s Repayment Table</span>
          </>
        ) : (
          "Repayments Table"
        )}
      </h2>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Funding Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.id}</TableCell>
                      <TableCell>{detail.amount}</TableCell>
                      <TableCell>{detail.dueDate}</TableCell>
                      <TableCell>{detail.paymentDate || "N/A"}</TableCell>
                      <TableCell>{detail.isPaid ? "Paid" : "Not Paid"}</TableCell>
                      <TableCell>{detail.fundingId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Details;
