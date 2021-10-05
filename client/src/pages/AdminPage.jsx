import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AdminMain } from '../components/AdminMain/AdminMain';

export const AdminPage = () => {
  const [data, setData] = useState([]);

  const fetchData = (endpoint) => {
    fetch(`http://localhost:3000/api/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
      })
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar fetchData={fetchData} />
      </Grid>
      <Grid item xs={9}>
        <AdminMain data={data} />
      </Grid>
    </Grid>
  )
}
