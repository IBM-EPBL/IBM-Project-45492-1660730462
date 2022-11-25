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
import SignInWithGoogleButton from "../../Utils/SignInWithGoogleButton";
import ValidatedAuthTextField from "../../Utils/FormFields/ValidatedAuthTextField";
import { BorderColor } from "@mui/icons-material";

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
                    <Typography variant="h5" color={"white"} fontWeight="800" fontFamily={'Acme'} textAlign='center'>
                        Trip Based Fuel Consumption Prediction</Typography>
                </Grid>
                {showOtp && (
                    <Grid item xs={12}>
                        <Typography variant="h5" color={"white"}>Enter Otp</Typography>
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
                                <SignInWithGoogleButton/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ color: "white" }}>
                                <Divider sx={{ color: "white",textAlign: "center",fontFamily: "Acme", fontWeight: "bold",
                                    "&::before , &::after" : {
                                        borderWidth: "thin",
                                        borderColor: 'white'
                                    }
                            }}>Or</Divider>
                                {/* <Typography fontWeight={400}>Or</Typography> */}
                                {/* <Divider sx={{ borderBottomWidth: "thick" }}/> */}
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
                        <ValidatedAuthTextField name="name" label="Name"/>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ValidatedAuthTextField name="mobile" label="Mobile"/>

                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedAuthTextField name="email" label="Email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <ValidatedAuthTextField name="password" label="Password" type="password"/>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" variant="contained" color="neutral">
                                    Sign Up
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
                        <ValidatedAuthTextField name="otp" label="Otp" type="otp"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" variant="contained" color="neutral">
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
