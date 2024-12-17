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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/repayments?fundingId=${id}`);
      const repaymentData = Array.isArray(response.data) ? response.data : [];
      const filteredFundingData = repaymentData.filter(repayment => repayment.fundingId ===  Number(id));
      console.log("Details for this", id ,"is",filteredFundingData);
      console.log(repaymentData);
      
      setDetails(filteredFundingData); 
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
      <h2>Funding Details</h2>
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
                                        <TableCell>{detail.paymentDate || "Loading..."}</TableCell>
                                        <TableCell>{detail.isPaid ? "Paid" : "Pending"}</TableCell>
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

