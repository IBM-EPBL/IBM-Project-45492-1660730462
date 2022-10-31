import { AccountCircle } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../helpers";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    function handleClose(event) {
        setOpen(false);
        setAnchorEl(null);
    }

    function handleLogout() {
        navigate("/login", { replace: true });
        logout();
    }

    return (
        <Box
            sx={{
                bgcolor: "red",
                height: "48px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box paddingLeft={2}>
                <Typography variant="h5" color="white">
                    TBFCP
                </Typography>
            </Box>

            <Box paddingRight={2}>
                <IconButton aria-describedby="user-profile-popover" onClick={handleClick}>
                    <AccountCircle />
                </IconButton>
            </Box>

            <Popover
                id="user-profile-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box sx={{ width: "100%", minWidth: "200px", maxWidth: 360, bgcolor: "background.paper" }}>
                    <nav aria-label="primary user menu">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </Popover>
        </Box>
    );
}
