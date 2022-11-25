import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import FormBox from "../Utils/FormBox";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import apiModal from "../../Modals/Api/ApiModals";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import ExcelSheetLink from "../../assets/downloadables/sample-excel.csv"

export default function MultiSamplePrediction() {
    const [csvFile, setCsvFile] = useState(null);
    const [predictedValues, setPredictedValues] = useState(null);
    const [sampleId, setSampleId] = useState(null)

    const handleSubmit = () => {
        apiModal.multipleSamplePrediction(csvFile, function (res, success) {
            if (success) {
                setPredictedValues(res.data.predicted);
                setSampleId(res.data.id);
            }
        });
    };

    const handleFileChange = (file) => {
        setCsvFile(file);
    };

    const handleDownloadReport = () => {
        apiModal.getMultipleSamplePredictionReport(sampleId, function(res, success) {
            if(success){
                console.log(res)
            }
        })
    }

    const FormBoxAction = () => {
        return(<Button variant="outlined" LinkComponent={Link} to={ExcelSheetLink} download target="_blank" >Download Sample Dataset</Button>)
    }

    return (
        <Grid container spacing={3} sx={{ marginBottom: 10 }}>
            <Grid item xs={12}>
                <Accordion sx={{ paddingInline: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5" fontWeight={600}>
                            Instructions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem>{">"}&nbsp;&nbsp;Download the Sample CSV Sheet</ListItem>
                            <ListItem>{">"}&nbsp;&nbsp;Enter the values in the CSV Sheet</ListItem>
                            <ListItem>{">"}&nbsp;&nbsp;Upload the CSV sheet in the form given below</ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <Grid item xs={12}>
                <FormBox title="Multiple Sample Prediction" titleAction={<FormBoxAction/>}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FileUploader
                                handleChange={handleFileChange}
                                name="csvFile"
                                types={["CSV"]}
                                label="Upload or drop your CSV file here"
                                fileOrFiles={csvFile}
                                maxSize={3}
                            />
                        </Grid>
                        {csvFile && (
                            <Grid item xs={12}>
                                <Typography>{csvFile.name}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button variant="contained" disabled={csvFile === null} onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button
                                variant="outlined"
                                disabled={csvFile === null}
                                sx={{ marginLeft: 2 }}
                                onClick={() => {
                                    setPredictedValues(null);
                                    setCsvFile(null);
                                }}
                            >
                                Clear
                            </Button>
                        </Grid>
                    </Grid>
                </FormBox>
            </Grid>
            {predictedValues && (
                <Grid item xs={12}>
                    <PredictionTable data={predictedValues} onDownloadReport={handleDownloadReport}/>
                </Grid>
            )}
        </Grid>
    );
}

const PredictionTable = ({ data, onDownloadReport }) => {
    const [pageSize, setPageSize] = useState(10);
    const columns = [
        { field: "name", headerName: "Name", width: 200 },
        { field: "mileage", headerName: "Mileage (Km)", width: 200, type: "number" },
        { field: "vehicleWeight", headerName: "Vehicle Weight (Tonnes)", width: 200, type: "number" },
        {
            field: "payloadWeight",
            headerName: "Payload Weight",
            type: "number",
            width: 250,
        },
        {
            field: "distance",
            headerName: "Distance",
            type: "number",
            width: 150,
        },
        {
            field: "averageSpeed",
            headerName: "Average Speed",
            type: "number",
            width: 150,
        },
        {
            field: "roadType",
            headerName: "Road Type",
            width: 170,
        },
        {
            field: "fuelType",
            headerName: "Fuel Type",
            width: 170,
        },
        {
            field: "predictedValue",
            headerName: "Predicted Fuel Consumption (Litres)",
            width: 350,
        },
    ];

    return (
        <Paper sx={{height: '500px', padding: 4}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="h5" fontWeight={600}>Predicted Results</Typography>
                <Button variant="contained" onClick={onDownloadReport}>Download Report</Button>
            </Box>
            <DataGrid
                rows={data}
                sx={{
                    border: 'none',
                }}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25, 50]}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            />
        </Paper>
    );
};
