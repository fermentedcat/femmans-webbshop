import React, { useContext, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Button, ListItem, ListItemText } from '@mui/material';
import { UiContext } from '../../../context/uiContext';

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

export const ProductListItem = ({
  product, removeListItem, updateListItem, categories,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { setNotification } = useContext(UiContext);

  const toggleShowModal = () => {
    if (showModal) {
      setIsEditing(false);
    }
    setShowModal(!showModal);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    if (!window.confirm('Är du säker på att du vill radera denna produkt?')) {
      return;
    }
    try {
      await deleteProduct(product._id);
      setNotification({
        type: 'success',
        message: 'Produkten har raderats!',
      });
      removeListItem(product._id);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Misslyckades med att radera produkten.',
      });
    }
  };

  const handleEdit = async (prod, id) => {
    try {
      const res = await updateProduct(prod, id);
      updateListItem(res.data);
      setNotification({
        type: 'success',
        message: 'Produkten har uppdaterats!',
      });
      toggleEdit();
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Uppdatering av produkten misslyckades.',
      });
    }
  };

  return (
    <>
      <StyledListItem>
        <ListItemText primary={`${product.title}`} />
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
        {isEditing ? <ProductForm productToEdit={product} handleEdit={handleEdit} categories={categories} /> : <ProductTable product={product} />}
        <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
          {isEditing ? 'Ångra' : 'Redigera produkt'}
        </Button>
      </BasicModal>

    </>
  );
};
