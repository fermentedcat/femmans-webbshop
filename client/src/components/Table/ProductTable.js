import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { SectionHeaderRow } from './styled/SectionHeaderRow';
import { TitleHeader } from './styled/TitleHeader';

export const ProductTable = ({ product }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <SectionHeaderRow>
            <TableCell align="left" colSpan="3">
              Produkt
            </TableCell>
          </SectionHeaderRow>
          <TableRow>
            {Object.keys(product).map((e, i) => {
              return <TitleHeader key={i}>{e}</TitleHeader>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.values(product).map((e, i) => {
              if (Array.isArray(e)) {
                return e.map((e, i) => (
                  <TableCell key={i}>{e.title ?? e}</TableCell>
                ));
              }
              return <TableCell key={i}>{e}</TableCell>;
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
