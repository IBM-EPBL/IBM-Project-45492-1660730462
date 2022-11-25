import { Grid, Typography, Box, Paper } from "@mui/material";
import React from "react";
import ProfileDetailsCard from "../Utils/ProfileDetailsCard";
import Fcpbackground from "../../assets/images/FCPbackground.png";
import PriceCalculator from "../Utils/PriceCalculator";
export default function Home() {
    return (
        <>
            <Grid container spacing={4} sx={{ padding: 4 }}>
                <Grid item xs={12} md={10} lg={8}>
                    <Typography
                        variant="h4"
                        color={"#4B255A"}
                        fontSize={40}
                        fontWeight={"600"}
                        fontFamily={"Poppins"}
                        sx={{ textDecoration: "underline" }}
                    >
                        FUEL CONSUMPTION PREDICTION
                    </Typography>
                </Grid>
                <Grid item xs={12} md={10} lg={6}>
                    <ProfileDetailsCard />
                </Grid>
                <Grid item xs={4}>
                    <PriceCalculator/>
                </Grid>
            </Grid>
            {/* <Box sx={{ position: "absolute", right: 2, bottom: 8, zIndex: 0 }}>
                <img src={Fcpbackground} style={{ height: 600, width: 420 }} />
            </Box> */}
        </>
    );
}
