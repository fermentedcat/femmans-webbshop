import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ListItem, ListItemText, Select, MenuItem } from '@mui/material';

import { BasicModal } from '../../Layout/BasicModal';
import { ProductForm } from '../../Form/ProductForm';
import { updateProduct, deleteProduct } from '../../../api/api';
import { ProductTable } from '../../Table/ProductTable';

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: '2px solid #f0f0f0',
  padding: '1em',
  button: {
    padding: '1.05em',
    border: '1px solid #f0f0f0',
  },
}));

const StyledSelect = styled(Select)(() => ({
  width: '10em',
  padding: 0,
  marginRight: '1em',
}));

export const ProductListItem = ({ product, removeListItem, updateListItem, categories}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e) => {
    if (!window.confirm('Är du säker på att du vill radera denna produkt?')) {
      return;
    }
    try {
      await deleteProduct(product._id);
      removeListItem(product._id)
    } catch (error) {
      console.log(error)
    }
  };

  const toggleShowModal = () => {
    if(showModal){
      setIsEditing(false)
    }
    setShowModal(!showModal);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEdit = async (product, id) => {
    try {
      const res = await updateProduct(product, id)
      console.log(res)
      updateListItem(res.data)
      toggleEdit();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <StyledListItem>
        <ListItemText primary={`${product.title}`}/>
        <Button onClick={toggleShowModal}>Öppna</Button>
        <Button onClick={handleDelete} color="warning">
          Ta bort
        </Button>
      </StyledListItem>

      <BasicModal
        open={showModal}
        onClose={toggleShowModal}
        title={isEditing ? 'Ändra produkt' : 'Produktdetaljer'}
        descriptions={[`Product ID ${product._id}`]}
      >
        {isEditing ? <ProductForm productToEdit={product} handleEdit={handleEdit} categories={categories}/> : <ProductTable product={product} />}
         <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
          {isEditing ? 'Ångra' : 'Redigera produkt'}
        </Button>
      </BasicModal>

    </>
  );
};
