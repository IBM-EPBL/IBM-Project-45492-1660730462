import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
const ValidatedAuthTextField = ({type="text", name, label, ...rest }) => {
    const [field, meta] = useField(name);
    return (
        <TextField
            name={name}
            size="small"
            type={type}
            label={label}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                      },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
            }}
            inputProps={{
                style:{
                    color:"white"
                }
            }}
            InputLabelProps={{
                style:{
                    color:"white"
                }
            }}
            helperText={(meta.touched && meta.error) || null}
            error={meta.touched && meta.error && true}
            {...field}
            {...rest}
            fullWidth
        />
    );
};

export default ValidatedAuthTextField