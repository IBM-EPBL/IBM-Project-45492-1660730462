import { Download, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useEffect } from "react";
import apiModal from "../../Modals/Api/ApiModals";

export default function MultiSampleHistory() {
    const [predictionHistory, setPredictionHistory] = useState([]);
    useEffect(() => {
        apiModal.getMultipleSamplePredictionHistory(function (res, success) {
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
        apiModal.getMultipleSamplePredictionReport(id, function(res, success) {
            if(success){
                console.log(res)
            }
        })
    }
    const columns = [
        {
            field: "sample_count",
            headerName: "Vehicle Count",
            type: "number",
            width: 100,
        },
        {
            field: "created_at",
            headerName: "Predicted At",
            type: "number",
            width: 150,
        },

        {
            field: "id",
            headerName: "",
            disableColumnMenu: true,
            sortable: false,
            renderCell: ({ id, row, formattedValue }) => {
                return (
                    <IconButton onClick={() => handleDownloadReport(id, row)}>
                        <Download color="primary" />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <>
            <Paper sx={{ height: "500px", padding: 4 }}>
                <Typography variant="h5" fontWeight={600}>
                    Multi Sample Predicted History
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
