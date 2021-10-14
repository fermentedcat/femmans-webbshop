import { useState, useEffect } from 'react';

export const useFetch = (callback, ...callbackArguments) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    callback(...callbackArguments)
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  })

  return { data, error };
};