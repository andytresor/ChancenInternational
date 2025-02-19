import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box, Button } from "@mui/material";

const PaymentConfirmation = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const navigate = useNavigate();

  // Parse query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const queryTransactionId = queryParams.get("transaction_id");
  const queryTransactionAmount = queryParams.get("transaction_amount");
  const queryTransactionStatus = queryParams.get("transaction_status");
  const queryTransactionGateway = queryParams.get("transaction_gateway");

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        // Determine which transaction id to use for fetching (query or route)
        const actualTransactionId = queryTransactionId || transactionId;
        const response = await axios.get(
          `https://a543-2a0d-3344-129e-410-cd7f-8af6-c93f-4529.ngrok-free.app/transactions/status/${actualTransactionId}`
        );
        setTransactionStatus(response.data);
      } catch (error) {
        console.error("Error fetching transaction status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [transactionId, queryTransactionId]);

  // Fallback: if the API response does not include the details, use the query parameters
  const status = transactionStatus?.status || queryTransactionStatus;
  const id = transactionStatus?.transaction_id || queryTransactionId;
  const amount = transactionStatus?.transaction_amount || queryTransactionAmount;

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
      <Typography variant="h4">{getStatusMessage(status)}</Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>
        Transaction ID: {id}
      </Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>
        Amount: {amount !== "null" ? amount : "N/A"} XAF
      </Typography>
      <Typography variant="body1" style={{ margin: "1rem 0" }}>
        Transaction Status: {status}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("https://a543-2a0d-3344-129e-410-cd7f-8af6-c93f-4529.ngrok-free.app/repayments")}
      >
        Back to Repayments
      </Button>
    </Box>
  );
};

export default PaymentConfirmation;
