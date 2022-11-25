import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import MultiSamplePrediction from "./MultiSamplePrediction";
import SingleSamplePrediction from "./SingleSamplePrediction";

export default function Prediction() {
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <Grid container paddingX={4} spacing={4}>
            <Grid item xs={12}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabIndex} onChange={(e, newValue) => {setTabIndex(newValue)}} aria-label="Prediction Tabs">
                        <Tab label="Single Sample Prediction" value={0}/>
                        <Tab label="Multiple Sample Prediction" value={1} />
                    </Tabs>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {(() => {
                    switch (tabIndex) {
                        case 0:
                            return <SingleSamplePrediction/>;

                        case 1:
                            return <MultiSamplePrediction/>;
                    }
                })()}
            </Grid>
        </Grid>
    );
}
