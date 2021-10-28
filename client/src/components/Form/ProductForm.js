import React, { useContext, useEffect, useState } from 'react'

import { addProduct } from '../../api/api'
import useInput from '../../hooks/useInput'
import { UiContext } from '../../context/uiContext'

import { Button } from '@mui/material'
import { product } from '../../constants/formFields'
import { FormGenerator } from './FormGenerator'


export const ProductForm = ({addToList, handleEdit, productToEdit = null, categories}) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [categoryId, setCategoryId] = useState(productToEdit && productToEdit.categories[0] ? productToEdit.categories[0]._id : "")
  const { setNotification } = useContext(UiContext);

  const titleInput = useInput(product.title.validate, productToEdit ? productToEdit.title : "")
  const descriptionInput = useInput(product.description.validate, productToEdit ? productToEdit.description : "")
  const priceInput = useInput(product.price.validate, productToEdit ? productToEdit.price : "")
  const brandInput = useInput(product.brand.validate, productToEdit ? productToEdit.brand : "")
  const weightInput = useInput(product.weight.validate, productToEdit ? productToEdit.weight : "")
  const photoInput = useInput(product.photo.validate, productToEdit && productToEdit.photos[0] ? productToEdit.photos[0] : "")

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value)
  }

  const categorySelect = {
    onChange: handleCategoryChange,
    categoryId,
    value: productToEdit ? productToEdit.categories[0] : null,
    options: categories
  }

  const inputs = [
    { ...titleInput, ...product.title },
    { ...descriptionInput, ...product.description },
    { ...priceInput, ...product.price },
    { ...brandInput, ...product.brand },
    { ...categorySelect, ...product.categories },
    { ...weightInput, ...product.weight },
    { ...photoInput, ...product.photo },
  ]

  const handleSubmit = async () => {
    if (!formIsValid) {
      return
    } else {
      const data = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        brand: brandInput.value,
        categories: [categoryId], 
        weight: weightInput.value,
        photos: [photoInput.value],
      }
      try {
        const response = await addProduct(data)
        if (response.data) {
          addToList(response.data)
          setNotification({
            type: 'success',
            message: 'Produkten har lagts till!',
          });
        }
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Misslyckades med att spara produkten.',
        });
      }
    }
  }

  useEffect(() => {
    setFormIsValid(
      titleInput.isValid &&
        descriptionInput.isValid &&
        priceInput.isValid &&
        brandInput.isValid &&
        weightInput.isValid &&
        photoInput.isValid
    )
  }, [
    titleInput.isValid,
    descriptionInput.isValid,
    priceInput.isValid,
    brandInput.isValid,
    weightInput.isValid,
    photoInput.isValid,
  ])

  const button = (
    <Button onClick={productToEdit ? () => handleEdit({
      title: titleInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      brand: brandInput.value,
      categories: [categoryId], 
      weight: weightInput.value,
      photos: [photoInput.value],
    }, productToEdit._id ) : handleSubmit} disabled={!formIsValid}>
      Spara
    </Button>
  )

  return (
    <FormGenerator inputs={inputs} button={button} />
  )
}
