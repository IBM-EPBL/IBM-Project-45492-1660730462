import { Clear } from "@mui/icons-material";
import { Box, FormControlLabel, FormGroup, Grid, IconButton, Switch, TextField, Typography } from "@mui/material";
import * as lodash from "lodash";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { getFuelPrice, getImperialGallonPrice } from "../../helpers";
import FormBox from "./FormBox";

export default observer(function PriceCalculator() {
    const [fuelQuantity, setFuelQuantity] = useState(0);
    const [imperial, setImperial] = useState(false);
    // const [show, setShow] = useState(false);
    const show = Boolean(fuelQuantity)

    const handleFuelQuantityChange = (e) => {
        setFuelQuantity(e.target.value);
        // setShow(true);
    };

    const handleClose = () => {
        // setShow(false);
        setFuelQuantity(0);
    };

    const ImperialSwitch = () => {
        return (
            <FormGroup>
                <FormControlLabel
                    control={<Switch />}
                    label={imperial ? "Gallon" : "Litre"}
                    onChange={(e, checked) => {
                        setImperial(checked);
                    }}
                    checked={imperial}
                    labelPlacement="start"
                />
            </FormGroup>
        );
    };
    return (
        <FormBox title="Price Calculator" titleStyle={{ fontSize: 16 }} titleAction={<ImperialSwitch />}>
            <Grid container spacing={4}>
                <Grid item xs={12} display="flex">
                    <Box>
                        <Typography>Current Price: </Typography>
                    </Box>
                    <Box paddingLeft={1}>
                        <Typography>Rs. {imperial ? getImperialGallonPrice(getFuelPrice()) : getFuelPrice()}</Typography>
                    </Box>
                    {/* <Box paddingLeft={1}>
                        <Typography>
                            {'Rs. ' + (imperial
                                ? `${getImperialGallonPrice(getFuelPrice() * fuelQuantity)}`
                                : `${lodash.round(getFuelPrice() * fuelQuantity, 2)}`)}
                        </Typography>
                    </Box> */}
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        name="quantity"
                        value={fuelQuantity}
                        onChange={handleFuelQuantityChange}
                        type="number"
                        inputProps={{ min: 0 }}
                        placeholder="Price"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={handleClose}>
                        <Clear />
                    </IconButton>
                </Grid>
                {show && (
                    <Grid item xs={12} display='flex'>
                        <Typography>Total Price is: </Typography>
                        <Typography paddingLeft={1}>
                            {imperial
                                ? getImperialGallonPrice(getFuelPrice() * fuelQuantity)
                                : lodash.round(getFuelPrice() * fuelQuantity, 2)}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </FormBox>
    );
});
