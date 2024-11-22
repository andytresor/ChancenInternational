import React, { useState } from "react";
import useSideBar from "../../re-components/Admin/UseSidebar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
} from "@mui/material";

const SettingsPage = () => {
    useSideBar();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [repaymentPercentage, setRepaymentPercentage] = useState(15);
  const [overdueDuration, setOverdueDuration] = useState(30);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveAccountDetails = () => {
    // Handle saving account details
    console.log("Account details saved!");
  };

  const handleSaveSystemSettings = () => {
    // Handle saving system settings
    console.log("System settings saved!");
  };

  return (
    <div className="main" id="main">
        <Grid container spacing={4} style={{ padding: "20px" }}>
      {/* Page Title */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
      </Grid>

      {/* Admin Account Management Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Manage Account
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAccountDetails}
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* System Thresholds and Rules Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Settings
            </Typography>
            {/* Repayment Percentage */}
            <Typography gutterBottom>Repayment Percentage (%)</Typography>
            <Slider
              value={repaymentPercentage}
              onChange={(e, value) => setRepaymentPercentage(value)}
              aria-labelledby="repayment-percentage-slider"
              valueLabelDisplay="auto"
              step={1}
              min={5}
              max={30}
              marks={[
                { value: 5, label: "5%" },
                { value: 15, label: "15%" },
                { value: 30, label: "30%" },
              ]}
            />

            {/* Overdue Duration */}
            <Typography gutterBottom style={{ marginTop: "20px" }}>
              Overdue Duration Before Notification (days)
            </Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              value={overdueDuration}
              onChange={(e) => setOverdueDuration(e.target.value)}
              inputProps={{ min: 1 }}
              margin="normal"
            />

            {/* Enable Notifications */}
            <FormControlLabel
              control={
                <Switch
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
              }
              label="Enable Notifications"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSystemSettings}
              style={{ marginTop: "16px" }}
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default SettingsPage;
