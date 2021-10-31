import React, { useContext, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  Button,
  ListItem,
  ListItemText,
} from '@mui/material/';
import { UiContext } from '../../../context/uiContext';

import { BasicModal } from '../../Layout/BasicModal';
import { CategoryForm } from '../../Form/CategoryForm';
import { updateCategory, deleteCategory } from '../../../api/api';
import { CategoryTable } from '../../Table/CategoryTable';

const StyledListItem = styled(ListItem)(() => ({
  borderBottom: '2px solid #f0f0f0',
  padding: '1em',
  button: {
    padding: '1.05em',
    border: '1px solid #f0f0f0',
  },
}));

export const CategoryListItem = ({
  category,
  removeListItem,
  updateListItem,
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

  const handleEdit = async (product, id) => {
    try {
      await updateCategory(product, id);
      updateListItem(product);
      setNotification({
        type: 'success',
        message: 'Kategorin har uppdaterats!',
      });
      toggleEdit();
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Uppdateringen misslyckades.',
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Är du säker på att du vill radera denna kategori?')) {
      return;
    }
    try {
      await deleteCategory(category._id);
      removeListItem(category._id);
      setNotification({
        type: 'success',
        message: 'Kategorin har raderats!',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Misslyckades med att radera kategorin.',
      });
    }
  };

  return (
    <>
      <StyledListItem>
        <ListItemText primary={`Kategori: ${category.title}`} />
        <Button onClick={toggleShowModal}>Öppna</Button>
        <Button onClick={handleDelete} color="warning">
          Ta bort
        </Button>
      </StyledListItem>

      <BasicModal
        open={showModal}
        onClose={toggleShowModal}
        title={isEditing ? 'Ändra kategori' : 'Kategoridetaljer'}
        descriptions={[`${category.title}`]}
      >
        {isEditing ? (
          <CategoryForm categoryToEdit={category} handleEdit={handleEdit} />
        ) : (
          <CategoryTable category={category} />
        )}
        <Button color={isEditing ? 'warning' : 'primary'} onClick={toggleEdit}>
          {isEditing ? 'Ångra' : 'Ändra kategori'}
        </Button>
      </BasicModal>
    </>
  );
};
