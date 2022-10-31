import { Grid } from '@mui/material'
import React from 'react'
import ProfileDetailsCard from '../Utils/ProfileDetailsCard'

export default function Home() {
  return (
    <Grid container spacing={4} sx={{padding:4}}>
        <Grid item xs={12} md={10} lg={6}>
            <ProfileDetailsCard/>
        </Grid>
    </Grid>
  )
}
