import { Box, Button, Typography } from "@mui/material";
import React from "react";
import GooglePng from "../../assets/images/google_icon.png";

export default function SignInWithGoogleButton() {
    return (
        <Button
            variant="text"
            sx={{ border: "1px solid black", textTransform: "none" }}
            startIcon={
                <Box width="28px" height="28px">
                    <img src={GooglePng} alt="google icon" width={28} height={28} />
                </Box>
            }
        >
            <Typography >
                Sign in with Google
            </Typography>
        </Button>
    );
}
