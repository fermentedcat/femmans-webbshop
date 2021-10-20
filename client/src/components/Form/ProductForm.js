import React, { useEffect, useState } from 'react'

import { addProduct, getCategories } from '../../api/api'
import useInput from '../../hooks/useInput'
import { Button } from '@mui/material'
import { product } from '../../constants/formFields'
import { FormGenerator } from './FormGenerator'
import { useFetch } from '../../hooks/useFetch'

export const ProductForm = ({ exitForm, updateList }) => {
  const [formIsValid, setFormIsValid] = useState(false)

  const titleInput = useInput(product.title.validate)
  const descriptionInput = useInput(product.description.validate)
  const priceInput = useInput(product.price.validate)
  const brandInput = useInput(product.brand.validate)
  const [categoryValue, setCategoryValue] = useState("")
  const weightInput = useInput(product.weight.validate)
  const photoInput = useInput(product.photo.validate)

  const { data: categories } = useFetch(getCategories)

  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value)
  }

  const categorySelect = {
    onChange: handleCategoryChange,
    value: categoryValue,
    options: categories || []
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
        categories: [categoryValue],
        weight: weightInput.value,
        photos: [photoInput.value],
      }
      try {
        const response = await addProduct(data)
        if (response.data) {
          updateList(response.data)
          exitForm()
        }
      } catch (error) {
        console.log('Failed saving product.')
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
    <Button onClick={handleSubmit} disabled={!formIsValid}>
      Spara
    </Button>
  )

  return (
    <FormGenerator inputs={inputs} onSumbit={handleSubmit} button={button} />
  )
}
