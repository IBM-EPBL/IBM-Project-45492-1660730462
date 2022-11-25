import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Dashboard({ children }) {
    // return (
    //     <Grid container sx={{ height: "100%", bgcolor: '#ffffff' }}>
    //         <Grid item xs={12} md={3} lg={2}>
    //             <Sidebar />
    //         </Grid>
    //         <Grid container item xs={12} md={9} lg={10} sx={{height: '100%'}}>
    //             <Grid item xs={12} >
    //                 <Header />
    //             </Grid>
    //             <Grid item xs={12} sx={{height: 'calc(100% - 48px)'}}>
    //                 <Outlet />
    //             </Grid>
    //         </Grid>
    //     </Grid>
    // );

    return (
        <Box sx={{bgcolor: "#F3EFEA"}}>
            <Header />
            <Grid container sx={{ minHeight: 'calc(100vh - 48px)'}}>
                {/* <Grid item xs={12}>
                </Grid> */}
                <Grid item container>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        lg={1.5}
                        paddingLeft="10px"
                        sx={{
                            borderRight: {
                                sx: "none",
                                lg: "3px solid black",
                            },
                        }}
                    >
                        <Sidebar />
                    </Grid>
                    <Grid item xs={12} md={9} lg={10} sx={{ height: "100%" }}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
