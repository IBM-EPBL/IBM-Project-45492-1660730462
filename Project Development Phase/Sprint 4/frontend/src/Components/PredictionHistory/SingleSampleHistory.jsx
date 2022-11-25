import { Download, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useEffect } from "react";
import apiModal from "../../Modals/Api/ApiModals";

export default function SingleSampleHistory() {
    const [predictionHistory, setPredictionHistory] = useState([]);
    useEffect(() => {
        apiModal.getSingleSamplePredictionHistory(function (res, success) {
            if (success) {
                setPredictionHistory(res.data);
            }
        });
    }, []);
    return <PredictionTable data={predictionHistory} />;
}

const PredictionTable = ({ data }) => {
    const [pageSize, setPageSize] = useState(10);

    const handleDownloadReport = (id, row) => {
        apiModal.getSingleSamplePredictionReport(id, function(res, success) {
            if(success){
                console.log(res)
            }
        })
    }
    const columns = [
        {
            field: "id",
            headerName: "",
            width: 40,
            disableColumnMenu: true,
            sortable: false,
            renderCell: ({ id, row, formattedValue }) => {
                return (
                    <IconButton onClick={() => handleDownloadReport(id, row)}>
                    {/* <IconButton onClick={(e) => handleRowMenuClick(e, id, row)}> */}
                        {/* <MoreVert /> */}
                        <Download color="primary" />
                    </IconButton>
                );
            },
        },
        { field: "vehicleNumber", headerName: "Vehicle Number", width: 200 },
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

        {
            field: "actualValue",
            headerName: "Actual Fuel Consumption (Litres)",
            width: 350,
        },
    ];

    return (
        <>
            <Paper sx={{ height: "500px", padding: 4 }}>
                <Typography variant="h5" fontWeight={600}>
                    Predicted History
                </Typography>
                <DataGrid
                    rows={data}
                    sx={{
                        border: "none",
                    }}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                />
            </Paper>
        </>
    );
};
