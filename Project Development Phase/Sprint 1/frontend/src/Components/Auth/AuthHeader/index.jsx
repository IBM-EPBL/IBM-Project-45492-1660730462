import { Box, Typography } from "@mui/material";
import React from "react";

import IBMLogo from "../../../assets/images/ibm.png";

export default function AuthHeader() {
    return (
        <Box
            sx={{
                bgcolor: "transparent",
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
            <Box sx={{
                pl: {
                    md: 2
                }
            }}>
                <img src={IBMLogo} style={{ height: "48px" }} />
            </Box>
            <Box sx={{ width: "16px", height: "16px" }} />
            <Typography fontFamily={"roboto"} variant="h6" color={"white"}>
                NAALAIYA THIRAN
            </Typography>
        </Box>
    );
}
