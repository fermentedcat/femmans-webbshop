import React from 'react';

import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableBody,
} from '@mui/material';

export const ProductTable = ({ product }) => {
  return (
    <TableContainer  component={Paper}>
      <Table aria-label="spanning table">
        <TableBody>
        {Object.entries(product).map((i, index) => {
          return (
            <TableRow key={index}>
              <TableCell sx={{fontWeight: "bold"}}>
                {i[0]}
              </TableCell>
              <TableCell>
                {Array.isArray(i[1]) ? i[1][0].title : i[1]}
              </TableCell>
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
