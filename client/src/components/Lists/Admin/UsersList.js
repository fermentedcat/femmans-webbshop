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


export const UsersList = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAll('users').then((data) => {
      setUsers(data)
    })
  }, [])

  return (
    <div>
      
    </div>
  )
}
