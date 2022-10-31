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
import CustomTextField from "../../Styled/CustomTextField";

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
                    <Typography variant="h5" color="black" fontWeight="800"
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
                    <Box sx={{ color: "black" }}>
                        <Divider sx={{ color: "white"}}>or</Divider>
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
                                        <TextField
                                            type="email"
                                            name="email"
                                            size="small"
                                            label="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            onBlur={handleBlur}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTextField
                                            type="password"
                                            name="password"
                                            size = "small"
                                            variant="outlined"
                                            label="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item container xs={12} justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2" sx={{ display: "inline" }}>
                                                New User ?
                                            </Typography>
                                            <Button
                                                variant="text"
                                                to="/signup"
                                                LinkComponent={Link}
                                                sx={{ textTransform: "none" }}
                                            >
                                                Signup
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}> */}
                                            <Button variant="contained" type="submit">
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
