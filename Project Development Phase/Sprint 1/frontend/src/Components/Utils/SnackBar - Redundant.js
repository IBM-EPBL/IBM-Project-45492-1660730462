import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { observer } from "mobx-react-lite";
import mainstore from "../../Modals/store";
import { runInAction } from "mobx";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar() {
    const {open, msg, duration, severity} = mainstore.snackBar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        runInAction(()=> {
            mainstore.snackBar = {
                ...mainstore.snackBar,
                open : false,
            }
        })
    };

    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{maxWidth: {
                xs: '80vw',
                sm: '80vw',
                md: '80vw',
                lg: '60vw',
                xl: '50vw'
            }}}>
                <Typography>
                    {msg}
                </Typography>
            </Alert>
        </Snackbar>
    );
}

export default observer(SnackBar)