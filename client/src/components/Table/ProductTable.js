import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
} from '@mui/material'
import React from 'react'

export const ProductTable = ({product}) => {

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
                Produkt
              </TableCell>
            </StyledSectionHeaderRow>
            <TableRow>
              {Object.keys(product).map((e, i) =>  {
              return <StyledTitleHeader key={i}>{e}</StyledTitleHeader>
            })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(product).map((e, i) => {
              if(Array.isArray(e)){
                return e.map((e, i) => <TableCell key={i}>{e.title ?? e}</TableCell>)
              }
              return <TableCell key={i}>{e}</TableCell>
              })}
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
  )
}
