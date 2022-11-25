import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
const ValidatedTextField = ({ name, label, ...rest }) => {
    const [field, meta] = useField(name);
    return (
        <TextField
            name={name}
            size="small"
            label={label}
            helperText={(meta.touched && meta.error) || null}
            error={meta.touched && meta.error && true}
            {...field}
            {...rest}
            fullWidth
        />
    );
};

export default ValidatedTextField