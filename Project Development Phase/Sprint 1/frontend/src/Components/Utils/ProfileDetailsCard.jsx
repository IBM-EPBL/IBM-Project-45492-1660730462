import { AccountCircle } from "@mui/icons-material";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import mainstore from "../../Modals/store";

export default observer(function ProfileDetailsCard() {
    const {name, mobile, email} = mainstore.userInfo
    return (
        <Paper sx={{ padding: 2 }}>
            <Grid container alignItems="center">
                <Grid item xs={12} lg={3}>
                    <AccountCircle sx={{ fontSize: 100 }} />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <Typography>Name : </Typography>
                            <Typography>Email :</Typography>
                            <Typography>Phone :</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 5 }}>
                            <Typography>{name}</Typography>
                            <Typography>{email}</Typography>
                            <Typography>{mobile}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
})