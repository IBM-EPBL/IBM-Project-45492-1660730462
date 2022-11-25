import { Box, Typography } from "@mui/material";
import React from "react";

import IBMLogo from "../../../assets/images/LOGO.png";

export default function AuthHeader() {
    return (
        <Box
            sx={{
                bgcolor: "transperant",
                width: "100%",
                minHeight: "48px",
                display: "flex",
                flexDirection: {
                    md: "row",
                    xs: "column",
                },
                justifyContent: {
                    md: "flex-start",
                    xs: "center",
                },
                alignItems: "center",
            }}
        >
            <Box paddingLeft={3} paddingTop={2}>
                <img src={IBMLogo} style={{ height: "50px", borderRadius: "10px"}} />
            </Box>
            <Box sx={{ width: "16px", height: "16px" }} />
        </Box>
    );
}
