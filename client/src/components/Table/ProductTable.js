import React from 'react';

import {
  Table,

  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

export const ProductTable = ({ product }) => {
  return (
    <TableContainer  component={Paper}>
      <Table aria-label="spanning table">
        {Object.entries(product).map(i => {
          return (
            <TableRow>
              <TableCell sx={{fontWeight: "bold"}}>
                {i[0]}
              </TableCell>
              <TableCell>
                {Array.isArray(i[1]) ? i[1][0].title : i[1]}
              </TableCell>
            </TableRow>
          )
        })}
      </Table>
    </TableContainer>
  );
};
