import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../AuthContainer";
import * as yup from "yup";
import { Formik } from "formik";
import apiModal from "../../../Modals/Api/ApiModals";
import { useSnackbar } from "notistack";
import { useSnackBarAction } from "../../../helpers";
import SignInWithGoogleButton from "../../Utils/SignInWithGoogleButton";
import ValidatedAuthTextField from "../../Utils/FormFields/ValidatedAuthTextField";
export default function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const { dismissOnlyAction } = useSnackBarAction();
    const navigate = useNavigate();

    const loginSchema = yup.object({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = (values) => {
        apiModal.login({ email: values.email, password: values.password }, (res, success) => {
            if (success) {
                enqueueSnackbar("Successfully Logged In", {
                    autoHideDuration: 5000,
                    action: dismissOnlyAction,
                    variant: "success",
                });
                navigate("/");
            } else {
                if (res.response.status === 400) {
                    enqueueSnackbar(res.response.data.msg, {
                        autoHideDuration: 5000,
                        variant: "error",
                        action: dismissOnlyAction,
                    });
                }
            }
        });
    };

    return (
        <AuthContainer>
            {/* Login Form Here */}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" color="white" fontWeight="800" fontFamily={'Acme'} textAlign='center'
                    >
                        Trip Based Fuel Consumption Prediction
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <SignInWithGoogleButton />
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
                    </Box> 
                </Grid>
                <Grid item xs={12}>
                    {/* <Box sx={{
                        }}> */}
                    <Formik validationSchema={loginSchema} initialValues={initialValues} onSubmit={handleLogin}>
                        {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                    <ValidatedAuthTextField name="email" label="Email"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <ValidatedAuthTextField name="password" label="Password" type="password"/>

                                    </Grid>

                                    <Grid item container xs={12} justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" sx={{ color: "white", display: "inline" }}>
                                                New User ?
                                            </Typography>
                                            <Button
                                                variant="text"

                                                to="/signup"
                                                LinkComponent={Link}
                                                sx={{ color: "cyan", textTransform: "none" }}
                                            >
                                                Signup
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}> */}
                                            <Button color="neutral" variant="contained" type="submit">
                                                Login
                                            </Button>
                                            {/* </Box> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                    {/* </Box> */}
                </Grid>
            </Grid>
        </AuthContainer>
    );
}
