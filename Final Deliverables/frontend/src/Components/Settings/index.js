import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Fcpbackground from "../../assets/images/FCPbackground.png";
import FormBox from "../Utils/FormBox";
import * as yup from "yup";
import { Formik } from "formik";
import ValidatedTextField from "../Utils/FormFields/ValidatedTextField";
import apiModal from "../../Modals/Api/ApiModals";
import { useSnackbar } from "notistack";
import { useSnackBarAction } from "../../helpers";
import { runInAction } from "mobx";
import mainstore from "../../Modals/store";
import { observer } from "mobx-react-lite";

export default observer(function Settings() {
    return (
        <>
            <Grid container sx={{ padding: 4 }} spacing={3}>
                <Grid item xs={12} md={10} lg={6}>
                    <Typography
                        variant="h5"
                        // color={"#4B255A"}
                        fontSize={36}
                        fontWeight={"600"}
                        fontFamily={"Galdeano"}
                        sx={{ textDecoration: "underline",paddingLeft: 4 }}
                    >
                        Settings
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ProfileDetailUpdateForm />
                </Grid>
            </Grid>
            {/* <Box sx={{ position: "absolute", right: 2, bottom: 8, zIndex: 0 }}>
                <img src={Fcpbackground} style={{ height: 600, width: 420 }} />
            </Box> */}
        </>
    );
})

const ProfileDetailUpdateForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const { enqueueSnackbar } = useSnackbar();
    const { dismissOnlyAction } = useSnackBarAction();

    useEffect(() => {
        apiModal.getProfileDetails((res, success) => {
            if (success) {
                console.log("Res obtained", res.data);
                setInitialValues({
                    name: res.data.name,
                    email: res.data.email,
                    mobile: res.data.mobile || "",
                });
            }
        });
    }, []);

    const profileSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        mobile: yup.string().required("Mobile is required"),
    });

    const updateProfile = (values) => {
        apiModal.updateProfile({name: values.name, email: values.email, mobile: values.mobile}, (res, success) => {
            console.log("Values = ", values)
            if(success){
                console.log("Ok")
                enqueueSnackbar("Successfully Updated Profile", {action: dismissOnlyAction, variant:"success"})
            }else{
                enqueueSnackbar("Something Went Wrong", {action: dismissOnlyAction, variant:"error"})
            }
        })
    }

    return (
        <FormBox title="Profile Details">
            <Formik enableReinitialize validationSchema={profileSchema} initialValues={initialValues} onSubmit={updateProfile}>
                {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <ValidatedTextField name="name" label={"Name"} />
                            </Grid>
                            <Grid item xs={6}>
                                <ValidatedTextField name="email" label={"Email"} disabled />
                            </Grid>
                            <Grid item xs={6}>
                                <ValidatedTextField name="mobile" label={"Mobile"} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button color="primary" variant="contained" type="submit">
                                        Update
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
