import React from 'react'
import { getCategories } from '../../../api/api'
import List from '@mui/material/List';
import { CategoryForm } from '../../Form/CategoryForm';
import { useFetch } from '../../../hooks/useFetch';
import { CategoryListItem } from './CategoryListItem';


export const CategoriesList = () => {
  const {data: categories, setData: setCategories } = useFetch(getCategories);

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
