import React, {useEffect, useState} from 'react'
import useInput from '../../hooks/useInput';
import { category } from "../../constants/formFields";
import { addCategory } from '../../api/api';
import { FormGenerator } from './FormGenerator';
import { Button } from '@mui/material';


export const CategoryForm = ({addToList, categoryToEdit, handleEdit = null}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const titleInput = useInput(category.title.validate, categoryToEdit ? categoryToEdit.title: "")
  const thumbnailInput = useInput(category.thumbnail.validate, categoryToEdit ? categoryToEdit.thumbnail: "")
  const descriptionInput = useInput(category.description.validate, categoryToEdit ? categoryToEdit.description: "")

  const inputs = [
    {...titleInput, ...category.title},
    {...thumbnailInput, ...category.thumbnail},
    {...descriptionInput, ...category.description},
  ];

  const handleSubmit = async () => {
    if (!formIsValid) {
      return;
    } else {
      const data = {
        title: titleInput.value,
        thumbnail: thumbnailInput.value,
        description: descriptionInput.value
      }
      try {
        const response = await addCategory(data)
        addToList(response.data);
      } catch (error) {
        console.log('Register failed.')
      } finally{
      }
    }
  };

  useEffect(() => {
    setFormIsValid(
    titleInput.isValid &&
    thumbnailInput.isValid &&
    descriptionInput.isValid)
  }, [titleInput.isValid, thumbnailInput.isValid, descriptionInput.isValid])

  return (
    <FormGenerator inputs={inputs}>
      <Button onClick={categoryToEdit ? () => handleEdit({
        _id: categoryToEdit._id,
        title: titleInput.value,
        thumbnail: thumbnailInput.value,
        description: descriptionInput.value
      }, categoryToEdit._id) : handleSubmit} disabled={!formIsValid}>Spara</Button>
    </FormGenerator>
  )
}