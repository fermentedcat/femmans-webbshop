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

export default function OrdersList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getAll('orders').then((data) => {
      console.log(data)
      setOrders(data)
    })
  }, [])

  return (
    <List dense>
      {orders && orders.map((order, index) => {
        return (
          <ListItem>
            <ListItemText
              primary={order._id}
              secondary={order.status}
            />
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        )
      })}
  </List>
  )
}
