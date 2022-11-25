import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Fcpbackground from "../../assets/images/FCPbackground.png";
import mainstore from "../../Modals/store";
import PriceCalculator from "../Utils/PriceCalculator";
export default function Home() {
    return (
        <>
            <Grid container spacing={5} sx={{ paddingTop: 5, paddingLeft: 10 }}>
                <Grid item xs={12} md={10} lg={8}>
                    <Typography
                        variant="h4"
                        // color={"#4B255A"}
                        fontSize={"35px"}
                        fontWeight={"900"}
                        fontFamily={"Galdeano"}
                    >
                        <FontAwesomeIcon icon={faUser} size="2x" />
                        &nbsp; Welcome ! {mainstore.userInfo.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Typography
                        variant="h3"
                        // color={"#4B255A"}
                        fontSize={"40px"}
                        fontWeight={"900"}
                        fontFamily={"Galdeano"}
                        sx={{ textDecoration: "underline" }}
                    >
                        FUEL CONSUMPTION PREDICTION
                    </Typography>
                </Grid>

                <Grid item xs={12} md={10} lg={8.5}>
                    <Typography
                        // color={"#4B255A"}
                        fontSize={"20px"}
                        fontWeight={"575"}
                        fontFamily={"Poppins"}
                        sx={{ textIndent: 70 }}
                    >
                        Fuel consumption prediction plays a vital role in managing the fuel expenses and vehicular
                        efficiency. Thus the website is designed in a way which allows users to certainly predict and
                        estimate the consumption accurately here.
                        <br />
                        <br />
                        Now you are ready to Predict it....
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{marginTop: 5 }}>
                    <PriceCalculator />
                </Grid>
            </Grid>
            {/* <Grid container spacing={4} sx={{ paddingTop: 8, paddingLeft: 13 }}>
            </Grid>

            <Grid container spacing={2} sx={{ paddingTop: 3, paddingLeft: 8 }}>
            </Grid> */}
            <Box sx={{ position: "absolute", right: 2, bottom: 8, zIndex: 0 }}>
                <img src={Fcpbackground} style={{ height: 600, width: 420 }} />
            </Box>
        </>
    );
}
