import React from 'react'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export const Sidebar = ({ fetchData }) => {

    const listItems = [
        { text: 'Products', endpoint: 'products' },
        { text: 'Orders', endpoint: 'orders' },
        { text: 'Customers', endpoint: 'customers' },
        { text: 'Categories', endpoint: 'categories' }
    ]

    return (
        <List>
            {listItems.map((item) => {
                return <ListItem key={item.text}>
                    <ListItemButton onClick={() => fetchData(item.endpoint)}>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    )
}
