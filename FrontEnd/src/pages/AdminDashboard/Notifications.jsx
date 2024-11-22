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
    Checkbox,
    IconButton,
    Toolbar,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Delete, Replay } from "@mui/icons-material";


const Notifications = () => {
    useSideBar();

    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [isBulkActionModalOpen, setBulkActionModalOpen] = useState(false);
    const [bulkActionType, setBulkActionType] = useState("");

    // Dummy data for notifications
    const notifications = [
        {
            id: 1,
            name: "John Doe",
            institution: "Institution A",
            date: "2024-11-20",
            message: "Your repayment for October is overdue.",
            status: "Unread",
        },
        {
            id: 2,
            name: "Jane Smith",
            institution: "Institution B",
            date: "2024-11-19",
            message: "Your repayment for October is overdue.",
            status: "Read",
        },
        {
            id: 3,
            name: "Alice Johnson",
            institution: "Institution A",
            date: "2024-11-18",
            message: "Your repayment for October is overdue.",
            status: "Unread",
        },
    ];

    // Handlers for bulk actions
    const handleSelectNotification = (id) => {
        setSelectedNotifications((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedNotifications.length === notifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(notifications.map((notification) => notification.id));
        }
    };

    const handleBulkAction = (actionType) => {
        setBulkActionType(actionType);
        setBulkActionModalOpen(true);
    };

    return (
        <div className="main" id="main">
            <Grid container spacing={4} style={{ padding: "20px" }}>
                {/* Page Title */}
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Notifications
                    </Typography>
                </Grid>

                {/* Bulk Actions Toolbar */}
                <Grid item xs={12}>
                    <Toolbar>
                        <Checkbox
                            indeterminate={
                                selectedNotifications.length > 0 &&
                                selectedNotifications.length < notifications.length
                            }
                            checked={selectedNotifications.length === notifications.length}
                            onChange={handleSelectAll}
                        />
                        <Tooltip title="Resend">
                            <IconButton
                                color="primary"
                                onClick={() => handleBulkAction("Resend")}
                                disabled={selectedNotifications.length === 0}
                            >
                                <Replay />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Clear">
                            <IconButton
                                color="secondary"
                                onClick={() => handleBulkAction("Clear")}
                                disabled={selectedNotifications.length === 0}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1" style={{ marginLeft: "auto" }}>
                            {selectedNotifications.length} selected
                        </Typography>
                    </Toolbar>
                </Grid>

                {/* Notifications Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Student Name</TableCell>
                                            <TableCell>Institution</TableCell>
                                            <TableCell>Notification Date</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {notifications.map((notification) => (
                                            <TableRow key={notification.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedNotifications.includes(notification.id)}
                                                        onChange={() => handleSelectNotification(notification.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{notification.name}</TableCell>
                                                <TableCell>{notification.institution}</TableCell>
                                                <TableCell>{notification.date}</TableCell>
                                                <TableCell>{notification.message}</TableCell>
                                                <TableCell>{notification.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bulk Action Modal */}
                <Dialog
                    open={isBulkActionModalOpen}
                    onClose={() => setBulkActionModalOpen(false)}
                >
                    <DialogTitle>
                        {bulkActionType === "Resend" ? "Resend Notifications" : "Clear Notifications"}
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to {bulkActionType.toLowerCase()} the selected notifications?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setBulkActionModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color={bulkActionType === "Resend" ? "primary" : "secondary"}
                            onClick={() => {
                                // Perform the bulk action here
                                setBulkActionModalOpen(false);
                                setSelectedNotifications([]);
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    );
};

export default Notifications;
