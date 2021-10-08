import React from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { DATA_CATEGORIES } from '../../constants/constants'

export const Sidebar = ({ setCategoryObject }) => {

    return (
        <List>
            {DATA_CATEGORIES.map((item) => {
                return <ListItem key={item.category}>
                    <ListItemButton onClick={() => setCategoryObject(item)}>
                        <ListItemText primary={item.category} />
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    )
}
