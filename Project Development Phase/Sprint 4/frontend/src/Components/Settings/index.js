import { Grid, Typography, Box, Button } from "@mui/material";
import React from "react";
import Fcpbackground from "../../assets/images/FCPbackground.png";
import FormBox from "../Utils/FormBox";
import * as yup from "yup";
import { Formik } from "formik";
import ValidatedTextField from "../Utils/FormFields/ValidatedTextField";

export default function Settings() {
    return (
        <>
            <Grid sx={{ padding: 4 }} spacing={3}>
                <Grid item xs={12} md={10} lg={6}>
                    <Typography
                        variant="h5"
                        color={"#4B255A"}
                        fontSize={30}
                        fontWeight={"600"}
                        fontFamily={"Poppins"}
                        sx={{ textDecoration: "underline" }}
                    >
                        SETTINGS
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <ProfileDetailUpdateForm />
                </Grid>
            </Grid>
            <Box sx={{ position: "absolute", right: 2, bottom: 8, zIndex: 0 }}>
                <img src={Fcpbackground} style={{ height: 600, width: 420 }} />
            </Box>
        </>
    );
}

const ProfileDetailUpdateForm = () => {
    const initialValues = {
        name: "",
        email: "",
        mobile: "",
    };

    const profileSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        mobile: yup.string().required("Mobile is required"),
    });

    return (
        <FormBox title="Profile Details">
            <Formik validationSchema={profileSchema} initialValues={initialValues}>
                {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <ValidatedTextField name="name" label={"Name"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ValidatedTextField name="email" label={"Email"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ValidatedTextField name="mobile" label={"Mobile"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', }}>
                                <Button color="primary" variant="contained" type="submit">
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                )}
            </Formik>
        </FormBox>
    );
};
