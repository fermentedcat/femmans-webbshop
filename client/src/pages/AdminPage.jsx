import React from 'react'
import Grid from '@mui/material/Grid';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const AdminPage = () => {
    return (
        <Grid container>
            <Grid item xs={3}><Sidebar /></Grid>
            <Grid item xs={9}>Stuff</Grid>
        </Grid>
    )
}
