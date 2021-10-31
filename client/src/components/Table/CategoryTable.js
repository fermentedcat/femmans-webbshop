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

export const CategoryTable = ({ category }) => (
  <TableContainer component={Paper}>
    <Table aria-label="spanning table">
      <TableHead>
        <SectionHeaderRow>
          <TableCell colSpan={12}>
            Category
          </TableCell>
        </SectionHeaderRow>
        <TableRow>
          {Object.keys(category).map((e) => <TitleHeader key={e}>{e}</TitleHeader>)}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {Object.values(category).map((e) => <TableCell key={e._id}>{e}</TableCell>)}
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
