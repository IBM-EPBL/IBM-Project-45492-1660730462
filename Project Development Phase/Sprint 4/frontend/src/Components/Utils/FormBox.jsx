import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function FormBox({ children, title, titleAction=null, titleStyle={}}) {
    return (
        <Paper className="styled">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="h5" color="black" fontWeight="800" sx={{...titleStyle}}>
                            {title}
                        </Typography>
                        {titleAction}
                    </Box>
                </Grid>
                <Grid item xs={12} paddingBottom={1}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
}
