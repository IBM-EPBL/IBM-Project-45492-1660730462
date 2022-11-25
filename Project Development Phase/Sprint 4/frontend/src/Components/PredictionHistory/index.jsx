import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import MultiSampleHistory from "./MultiSampleHistory";
import SingleSampleHistory from "./SingleSampleHistory";

export default function PredictionHistory() {
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <Grid container paddingX={4} spacing={4}>
            <Grid item xs={12}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabIndex} onChange={(e, newValue) => {setTabIndex(newValue)}} aria-label="Prediction Tabs">
                        <Tab label="Single Sample History" value={0}/>
                        <Tab label="Multi Sample History" value={1} />
                    </Tabs>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {(() => {
                    switch (tabIndex) {
                        case 0:
                            return <SingleSampleHistory/>;

                        case 1:
                            return <MultiSampleHistory/>;
                    }
                })()}
            </Grid>
        </Grid>
    );
}
