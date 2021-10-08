import React, { useEffect, useState } from 'react'
import { getAll } from '../../../api'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductsList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getAll('products').then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div>
      
    </div>
  )
}
