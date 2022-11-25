import { faHouse, faMicrochip, faClockRotateLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, colors, List, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";

export default function Sidebar() {

    const ListItem = ({title, to, icon}) => {

        const match = useMatch(to)
        useEffect(()=>{console.log('match')}, [])
        const liButtonStyle = {
            padding: 1.5,
            marginBlock: 1,
            paddingInline: 1,
            paddingLeft: 2,
            borderRadius: 4,
            onfocus: colors.blue,
            '&:hover':{
                backgroundColor: "#FF9D67"
            },

            '&.active':{
                borderLeft: 20,
                borderColor: "#FF9D67",
                // borderColor: "orange",
                
            }
        };
        return(
            <ListItemButton  sx={liButtonStyle} className={match ? "active": ""} LinkComponent={Link} to={to}>
                <FontAwesomeIcon icon={icon} size="lg" type="standard"/> <Typography sx={{marginLeft: 2}} fontSize="1">{title}</Typography>
            </ListItemButton>
        )
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <List sx={{ marginInline: 1, marginTop: 3,color: "#4B255A" }}>
                <ListItem title="Home" icon={faHouse} to="home"/>
                <ListItem title="Prediction" icon={faMicrochip} to="prediction"/>
                <ListItem title="Prediction History" icon={faClockRotateLeft} to="history"/>
                <ListItem title="Settings" icon={faGear} to="settings"/>
            </List>
            <Button variant="text" sx={{marginBottom: 5, textAlign: 'left'}} onClick={() => {
                window.open("https://drive.google.com/file/d/1yfa9Q6elWytnnCoewvVx6Ik41XtmUnqk/view?usp=sharing", '_blank')
            }}>View User Manual</Button>
        </Box>
    );
}
