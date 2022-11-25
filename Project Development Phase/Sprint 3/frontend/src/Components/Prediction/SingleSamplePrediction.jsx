import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Formik, useField } from "formik";
import React from "react";
import FormBox from "../Utils/FormBox";
import * as Yup from "yup";
import ValidatedTextField from "../Utils/FormFields/ValidatedTextField";
import apiModal from "../../Modals/Api/ApiModals";
import { observer } from "mobx-react-lite";
import mainstore from "../../Modals/store";
import { useSnackbar } from "notistack";
import { getImperialGallonFromLitre, useSnackBarAction } from "../../helpers";
import { useState } from "react";
import * as lodash from "lodash";
import { action } from "mobx";

export default observer(function SingleSamplePrediction() {
    const { enqueueSnackbar } = useSnackbar();
    const { dismissOnlyAction } = useSnackBarAction();
    const [show, setShow] = useState(false);
    const [predictedValue, setPredictedValue] = useState(0);
    const [id, setId] = useState(null);
    const [imperial, setImperial] = useState(false);
    const initialValues = {
        vehicleNumber: '',
        mileage: 0,
        payloadWeight: 0,
        vehicleWeight: 0,
        distance: 0,
        fuelType: "",
        roadType: "",
        averageSpeed: 0,
    };

    const registrationRegex = /[A-Za-z][A-Za-z]\s([0-9][0-9])\s[A-Za-z][A-Za-z]\s[0-9][0-9][0-9][1-9]/g

    const validationSchema = Yup.object({
        vehicleNumber: Yup.string().required("Vehicle Number is required").matches(registrationRegex, 'Enter Vehicle Number in XX YY XX YYYY format'),
        mileage: Yup.number().min(1, "Mileage should be higher than 1").max(10, "Mileage should be less than 10").required("Mileage is required"),
        payloadWeight: Yup.number().min(0, "Payload Weight should be higher than 0"),
        vehicleWeight: Yup.number()
            .min(0.1, "Vehicle Weight should be higher than 0.1")
            .required("Vehicle Weight is required"),
        distance: Yup.number().min(1, "Distance should be higher than 1"),
        fuelType: Yup.string().required("Fuel Type is required"),
        roadType: Yup.string().required("Road Type is required"),
        averageSpeed: Yup.number().min(1, "Average Speed should be higher than 1").required(),
    });

    const predictSingleSample = (values) => {
        const payload = {
            mileage: parseInt(values.mileage),
            vehicleNumber: values.vehicleNumber,
            payloadWeight: parseInt(values.payloadWeight),
            vehicleWeight: parseInt(values.vehicleWeight),
            distance: parseInt(values.distance),
            fuelType: values.fuelType,
            roadType: values.roadType,
            averageSpeed: parseInt(values.averageSpeed),
        };
        apiModal.singleSamplePrediction(payload, function (res, success) {
            if (success) {
                setShow(true);
                setPredictedValue(res.data.predictedValue);
                setId(res.data.id)
            } else {
                enqueueSnackbar("Something went wrong", {
                    action: dismissOnlyAction,
                    variant: 'error'
                });
            }
        });
    };

    const handleDownloadReport = () => {
        apiModal.getSingleSamplePredictionReport(id, function(res, success){
            if(success){
                enqueueSnackbar("Report is downloaded", { action: dismissOnlyAction, variant: 'success'})
            }else{
                enqueueSnackbar("Something went wrong", { action: dismissOnlyAction, variant: 'error'})
            }
        })
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormBox title="Sample Prediction">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={predictSingleSample}
                    >
                        {({ values, errors, dirty, handleChange, handleBlur, touched, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="vehicleNumber" label="Vehicle Number" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="mileage" label="Mileage (Km/l)" />
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="vehicleWeight" label="Vehicle Weight (in Tonnes)" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="payloadWeight" label="Payload Weight (in Tonnes)" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="distance" label="Distance (km)" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <FormControl fullWidth>
                                            <InputLabel size="small" id="fuel-type-select-label">
                                                Fuel Type
                                            </InputLabel>
                                            <Select
                                                labelId="fuel-type-select-label"
                                                id="fuel-type-select"
                                                value={values.fuelType}
                                                size="small"
                                                name="fuelType"
                                                error={touched.fuelType && errors.fuelType && true}
                                                label="Fuel Type"
                                                onChange={handleChange}
                                            >
                                                {mainstore.metadata.dataSetColumnMapping.fuelType.map((fuelType) => {
                                                    return (
                                                        <MenuItem key={fuelType.name} value={fuelType.value}>
                                                            {fuelType.label}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            {touched.fuelType && errors.fuelType && (
                                                <FormHelperText error={true}>{errors.fuelType}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <FormControl fullWidth>
                                            <InputLabel size="small" id="road-type-select-label">
                                                Road Type
                                            </InputLabel>
                                            <Select
                                                labelId="road-type-select-label"
                                                id="road-type-select"
                                                value={values.roadType}
                                                name="roadType"
                                                label="Road Type"
                                                size="small"
                                                error={touched.roadType && errors.roadType && true}
                                                onChange={handleChange}
                                                fullWidth
                                            >
                                                {mainstore.metadata.dataSetColumnMapping.roadType.map((roadType) => {
                                                    return (
                                                        <MenuItem key={roadType.name} value={roadType.value}>
                                                            {roadType.label}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            {touched.roadType && errors.roadType && (
                                                <FormHelperText error={true}>{errors.roadType}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} xl={3}>
                                        <ValidatedTextField name="averageSpeed" label="Average Speed (km/h)" />
                                    </Grid>
                                    <Grid item container xs={12} justifyContent="flex-end" alignItems="center">
                                        <Grid item>
                                            <Button variant="contained" type="submit">
                                                Predict
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </FormBox>
            </Grid>
            {show && (
                <Grid item xs={6}>
                    <Paper className="styled">
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h5" fontWeight={500}>
                                Prediction Result
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={imperial ? "Imperial" : "Metric"}
                                    onChange={(e, checked) => {
                                        setImperial(checked);
                                    }}
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            The estimated fuel consumption is{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {imperial ? `${getImperialGallonFromLitre(predictedValue)} Gallon` : `${lodash.round(predictedValue, 2)} Litre`}
                            </span>
                        </Typography>
                        <Button size="small" sx={{marginTop: 2}} variant="contained" onClick={handleDownloadReport}>Download Report</Button>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
});
