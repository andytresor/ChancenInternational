import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";

const PaymentConfirmation = () => {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/transactions/status/${transactionId}`
        );
        setTransactionStatus(response.data);
      } catch (error) {
        console.error("Error fetching transaction status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [transactionId]);

  const getStatusMessage = (status) => {
    switch (status) {
      case "SUCCESS":
        return "Payment Successful! 🎉";
      case "PENDING":
        return "Payment Pending. Please wait or contact support.";
      case "FAILED":
        return "Payment Failed. Please try again.";
      case "CANCELLED":
        return "Payment Cancelled by User.";
      default:
        return "Unknown Status.";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
        <Typography>Loading payment status...</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Typography variant="h4">{getStatusMessage(transactionStatus?.status)}</Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>
        Transaction ID: {transactionStatus?.transaction_id}
      </Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>
        Amount: {transactionStatus?.amount} XAF
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/repayments")}
      >
        Back to Repayments
      </Button>
    </Box>
  );
};

export default PaymentConfirmation;
