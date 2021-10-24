import React from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material'

const ResultList = styled(List)(() => ({
  width: '100%',
  maxWidth: 360,
  color: '#F9F9F9',
  bgcolor: 'none',
  position: 'absolute',
  top: 44,
  borderRadius: '3px',
  overflow: 'auto',
  maxHeight: 200,
  padding: 0,
  '& a': {
    opacity: '0.8',
    backgroundColor: '#C6BEBE',
    fontWeight: 'bold',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    '&:hover': {
      backgroundColor: '#686364',
      opacity: '1',
    },
    '& + a': {
      borderTop: '1px solid #EBE8E8',
    }
  },
}))

export const SearchResultList = ({ result, reset }) => {
  return (
    <ResultList>
      {result.map((product) => {
        return (
          <ListItemButton
            key={product._id}
            component={Link}
            to={`/product/${product._id}`}
            onClick={reset}
          >
            {product.title}
          </ListItemButton>
        )
      })}
    </ResultList>
  )
}
