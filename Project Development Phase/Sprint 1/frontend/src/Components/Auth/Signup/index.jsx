import { Box, Button, Divider, Grid, SvgIcon, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthContainer from "../AuthContainer";
import GooglePng from "../../../assets/images/google_icon.png";
import * as yup from "yup";
import { Formik } from "formik";
import apiModal from "../../../Modals/Api/ApiModals";
import { useSnackbar } from "notistack";
import { isOtpTokenExist, useSnackBarAction } from "../../../helpers";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [showOtp, setShowOtp] = useState(isOtpTokenExist());
    const { enqueueSnackbar } = useSnackbar();
    const { dismissOnlyAction } = useSnackBarAction();
    const navigate = useNavigate();
    const registerUser = (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            name: values.name,
            mobile: parseInt(values.mobile),
        };
        apiModal.register(payload, (res, success) => {
            if (success) {
                setShowOtp(true);
                enqueueSnackbar(`Otp has been sent to ${values.email}`, {
                    action: dismissOnlyAction,
                    variant: "success",
                    autoHideDuration: 5000,
                });
            } else {
                enqueueSnackbar(res.response.data.msg, {
                    action: dismissOnlyAction,
                    variant: "error",
                    autoHideDuration: 5000,
                });
            }
        });
    };

    const validateOtp = (values) => {
        const payload = {
            otp: parseInt(values.otp),
        };

        apiModal.validateOtp(payload, (res, success) => {
            if (success) {
                enqueueSnackbar(res.data.msg, {
                    action: dismissOnlyAction,
                    variant: "success",
                    autoHideDuration: 5000,
                });
                navigate("/login");
            } else {
                enqueueSnackbar(res.response.data.msg, {
                    action: dismissOnlyAction,
                    variant: "error",
                    autoHideDuration: 5000,
                });
            }
        });
    };

    return (
        <AuthContainer>
            {/* Signup Form Here */}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Trip Based Fuel Consumption Prediction</Typography>
                </Grid>
                {showOtp && (
                    <Grid item xs={12}>
                        <Typography variant="h5">Enter Otp</Typography>
                    </Grid>
                )}
                {!showOtp && (
                    <>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="text"
                                    sx={{ border: "1px solid black", textTransform: "none" }}
                                    startIcon={
                                        <Box width="28px" height="28px">
                                            <img src={GooglePng} width={28} height={28} />
                                        </Box>
                                    }
                                >
                                    Sign in with Google
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ color: "brown" }}>
                                <Divider sx={{ color: "black" }}>or</Divider>
                            </Box>
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    {showOtp && <OtpForm onSubmit={validateOtp} />}
                    {!showOtp && <SignupForm onSubmit={registerUser} />}
                </Grid>
            </Grid>
        </AuthContainer>
    );
}

const SignupForm = ({ onSubmit }) => {
    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        password: "",
    };

    const validationSchema = yup.object({
        email: yup.string().required("Email is required"),
        name: yup.string().required("Name is required"),
        password: yup.string().required("Password is required"),
        mobile: yup
            .number()
            .max("9999999999", "Invalid Mobile Number")
            .min(1000000000, "Invalid Mobile Number")
            .required("Mobile Number is required"),
    });

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                sx={{}}
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                onBlur={handleBlur}
                                fullWidth
                            >
                                Name
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                sx={{}}
                                label="Phone"
                                name="mobile"
                                fullWidth
                                value={values.mobile}
                                onChange={handleChange}
                                error={touched.mobile && Boolean(errors.mobile)}
                                helperText={touched.mobile && errors.mobile}
                                onBlur={handleBlur}
                            >
                                Phone
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                variant="standard"
                                sx={{}}
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                                fullWidth
                            >
                                Email
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                variant="standard"
                                name="password"
                                label="Password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                onBlur={handleBlur}
                                fullWidth
                            >
                                Password
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" variant="contained">
                                    Sign In
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

const OtpForm = ({ onSubmit }) => {
    const initialValues = {
        otp: "",
    };

    const validationSchema = yup.object({
        otp: yup.number().min(100000, "Invalid Otp").max(999999, "Invalid Otp").required("Otp is required"),
    });

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                label="Otp"
                                name="otp"
                                value={values.otp}
                                onChange={handleChange}
                                error={touched.otp && Boolean(errors.otp)}
                                helperText={touched.otp && errors.otp}
                                onBlur={handleBlur}
                                fullWidth
                            >
                                Otp
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" variant="contained">
                                    Register
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default observer(Signup);
