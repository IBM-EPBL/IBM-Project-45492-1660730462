import { AccountCircle } from "@mui/icons-material";
import IBMLogo from "../../../assets/images/LOGO.png";
import {
    Box, IconButton,
    List,
    ListItem,
    ListItemButton, ListItemText,
    Paper,
    Popover,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../helpers";
import { borderRadius } from "@mui/system";

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
                // bgcolor: "#0288D1",
                height: "48px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >

            <Box paddingLeft={3} paddingTop={2.5} >
            <Box sx={{
                pl: {
                    md: 2
                },
                pt: 1
            }}>
                <img src={IBMLogo} style={{ height: "50px", borderRadius: "10px" }} />
            </Box>
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
                <Box sx={{ width: "100%", minWidth: "200px", maxWidth: 360}}>
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
