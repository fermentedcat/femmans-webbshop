import React, {useEffect, useState} from 'react'
import useInput from '../../hooks/useInput';
import { category } from "../../constants/formFields";
import { addCategory } from '../../api/api';
import { FormGenerator } from './FormGenerator';
import { Button } from '@mui/material';


export const CategoryForm = ({exitForm}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const titleInput = useInput(category.title.validate)
  const thumbnailInput = useInput(category.thumbnail.validate)
  const descriptionInput = useInput(category.description.validate)

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
      console.log(data)
      try {
        const response = await addCategory(data)
        console.log('category added')
      } catch (error) {
        console.log('Register failed.')
      } finally{
        //exitForm()  
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
      <Button onClick={handleSubmit} disabled={!formIsValid}>Spara</Button>
    </FormGenerator>
  )
}