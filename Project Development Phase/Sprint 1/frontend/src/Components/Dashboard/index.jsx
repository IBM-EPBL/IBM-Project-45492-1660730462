import { Grid } from "@mui/material";
import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Dashboard({ children }) {
    return (
        <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid container item sx={{ height: "calc(100% - 48px)" }}>
                <Grid item xs={12} md={3} lg={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9} lg={10} sx={{height: '100%', bgcolor: 'orange'}}>
                    <Outlet />
                </Grid>
            </Grid>
        </Grid>
    );
}
