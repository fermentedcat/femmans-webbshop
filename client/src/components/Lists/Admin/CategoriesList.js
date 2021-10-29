import React, {useState} from 'react'
import { getCategories } from '../../../api/api'
import List from '@mui/material/List';
import { CategoryForm } from '../../Form/CategoryForm';
import { useFetch } from '../../../hooks/useFetch';
import { CategoryListItem } from './CategoryListItem';
import { Modal, Button, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: "80vh",
};



export const CategoriesList = () => {
  const [open, setOpen] = useState(false);
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
    <Button onClick={() => setOpen(!open)}> Add category </Button>
    <Modal open={open} onClose={() => setOpen(!open)}>
      <Box sx={style}>
      <CategoryForm addToList={addToList} onExit={() => setOpen(false)}/>
      </Box>
    </Modal>
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
