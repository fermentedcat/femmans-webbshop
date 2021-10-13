import { useState } from 'react';

export const useFetch = (callback, ...callbackArguments) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateData = () => {
    callback(...callbackArguments)
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }

  updateData();

  return { data, error, updateData };
};