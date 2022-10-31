import { Box } from "@mui/material";
import React from "react";
import AuthHeader from "./AuthHeader";
import AuthBG from "../../assets/images/auth_bg.jpg";

export default function AuthContainer({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                bgcolor: "white",
                backgroundImage: `url(${AuthBG})`,
                backgroundSize: "cover",
            }}
        >
            <AuthHeader />
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // bgcolor:'tan',
                }}
            >
                <Box
                    sx={{
                        // bgcolor: "green",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: {
                            xs: "center",
                            lg: "flex-end",
                        },
                        mr: {
                            xs: 0,
                            md: "24px",
                            lg: "calc(8px * 20)",
                            xl: "calc(8px * 10)",
                        },
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: "70%",
                                md: "60%",
                                lg: "30%",
                                xl: "25%",
                            },
                            // bgcolor: "transparent",
                            bgcolor: "white",
                            borderRadius: 1.5,
                            padding: 4,
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
