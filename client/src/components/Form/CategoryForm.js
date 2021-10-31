import React, { useContext, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { addCategory } from '../../api/api';
import useInput from '../../hooks/useInput';
import { UiContext } from '../../context/uiContext';

import { category } from '../../constants/formFields';
import { FormGenerator } from './FormGenerator';

export const CategoryForm = ({
  addToList, categoryToEdit, handleEdit = null, onExit,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const { setNotification } = useContext(UiContext);

  const titleInput = useInput(category.title.validate, categoryToEdit ? categoryToEdit.title : '');
  const thumbnailInput = useInput(category.thumbnail.validate, categoryToEdit ? categoryToEdit.thumbnail : '');
  const descriptionInput = useInput(category.description.validate, categoryToEdit ? categoryToEdit.description : '');

  const inputs = [
    { ...titleInput, ...category.title },
    { ...thumbnailInput, ...category.thumbnail },
    { ...descriptionInput, ...category.description },
  ];

  const handleSubmit = async () => {
    if (!formIsValid) {
      setNotification({
        type: 'error',
        message: 'Felaktiga uppgifter',
      });
    } else {
      const data = {
        title: titleInput.value,
        thumbnail: thumbnailInput.value,
        description: descriptionInput.value,
      };
      try {
        const response = await addCategory(data);
        addToList(response.data);
        onExit();
        setNotification({
          type: 'success',
          message: 'Kategorin har lagts till!',
        });
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Misslyckades med att spara kategorin.',
        });
      }
    }
  };

  useEffect(() => {
    setFormIsValid(
      titleInput.isValid
    && thumbnailInput.isValid
    && descriptionInput.isValid,
    );
  }, [titleInput.isValid, thumbnailInput.isValid, descriptionInput.isValid]);

  return (
    <FormGenerator inputs={inputs}>
      <Button
        onClick={categoryToEdit ? () => handleEdit({
          _id: categoryToEdit._id,
          title: titleInput.value,
          thumbnail: thumbnailInput.value,
          description: descriptionInput.value,
        }, categoryToEdit._id) : handleSubmit}
        disabled={!formIsValid}
      >
        Spara
      </Button>
    </FormGenerator>
  );
};
