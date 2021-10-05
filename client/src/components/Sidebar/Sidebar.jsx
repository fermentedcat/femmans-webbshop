import React from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export const Sidebar = () => {
    const listItems = [
        { text: 'Products', endpoint: '/products' },
        { text: 'Orders', endpoint: '/products' },
        { text: 'Customers', endpoint: '/customers' }
    ]
    return (
        <List>
            {listItems.map((item) => {
                return <ListItem key={item.text}>
                    <ListItemButton>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    )
}
