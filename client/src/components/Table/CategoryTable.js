import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import React from 'react'

export const CategoryTable = ({category}) => {
  const StyledSectionHeaderRow = styled(TableRow)(() => ({
    background: '#292828',
    th: {
      color: 'white',
      fontWeight: 700,
    },
  }));

  const StyledTitleHeader = styled(TableCell)(() => ({
    fontWeight: 700,
  }));

  return (
    <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <StyledSectionHeaderRow>
              <TableCell align="left" colSpan="3">
                Category
              </TableCell>
            </StyledSectionHeaderRow>
            <TableRow>
              {Object.keys(category).map((e, i) =>  {
              return <StyledTitleHeader key={i}>{e}</StyledTitleHeader>
            })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(category).map((e, i) => {
              return <TableCell key={i}>{e}</TableCell>
              })}
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
  )
}
