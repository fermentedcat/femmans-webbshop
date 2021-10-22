import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../api/api'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryForm } from '../../Form/CategoryForm';
import { useFetch } from '../../../hooks/useFetch';
import { Button } from '@mui/material';
import { CategoryListItem } from './CategoryListItem';


export const CategoriesList = () => {
  const {data: categories, setData: setCategories, error} = useFetch(getCategories);

  const removeListItem = (id) => {
    setCategories(categories.filter(item => item._id !== id))
  }

  const updateListItem = (newItem) => {
    setCategories(categories.map(item => item._id === newItem._id ? newItem : item))
  }

  const addToList = (newItem) => {
    setCategories([...categories, newItem])
  }

  return (
    <>
      <CategoryForm addToList={addToList}/>
      <List dense>
        {categories &&
          categories.map((category) => {
            return (

              <CategoryListItem
              key={category._id}
              category={category}
              removeListItem={removeListItem}
              updateListItem={updateListItem}
              />
            );
          })}
      </List>
    </>
  );
};
