import { Box, Button, Typography } from "@mui/material";
import React from "react";
import GooglePng from "../../assets/images/google_icon.png";
import { BASE_URL } from "../../Modals/Api/EndPoints";

export default function SignInWithGoogleButton() {
    const loginWithGoogle = () => {
        window.location.assign(BASE_URL+'google/login')
    }
    return (
        <Button
            variant="text"
            sx={{ border: "3px solid white", textTransform: "none" }}
            startIcon={
                <Box width="28px" height="28px">
                    <img src={GooglePng} alt="google icon" width={28} height={28} />
                </Box>
            }
            onClick={loginWithGoogle}
        >
            <Typography color={"white"}>
                Sign in with Google
            </Typography>
            
        </Button>
    );
}
