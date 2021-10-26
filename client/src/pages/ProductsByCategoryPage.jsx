import React from 'react';
import { getProductsByCategory } from '../api/api';
import { useFetch } from '../hooks/useFetch';

export const ProductsByCategoryPage = (props) => {
  const name = props.match.params.name;
  const {data} = useFetch(getProductsByCategory, name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};
