import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AdminMain } from '../components/AdminMain/AdminMain';

export const AdminPage = () => {
  const [categoryObject, setCategoryObject] = useState({ category: 'default', endpoint: '' });

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar setCategoryObject={setCategoryObject} />
      </Grid>
      <Grid item xs={9}>
        <AdminMain categoryObject={categoryObject} />
      </Grid>
    </Grid>
  );
};
