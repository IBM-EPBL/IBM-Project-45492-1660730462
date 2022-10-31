import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <Box
            sx={{
                height: {
                    xs: "auto",
                    md: "100%",
                },
                bgcolor: "green",
            }}
        >
            <List>
                <ListItemButton LinkComponent={Link} to="home">
                    Home
                </ListItemButton>
                <ListItemButton LinkComponent={Link} to="prediction">
                    Prediction
                </ListItemButton>
                <ListItemButton LinkComponent={Link} to="profile">
                    Profile
                </ListItemButton>
            </List>
        </Box>
    );
}
