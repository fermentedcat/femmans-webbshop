import { useState } from 'react';

export const useFetch = (callback, ...callbackArguments) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const run = () => {
    callback(...callbackArguments)
      .then((res) => {
        console.log('hejsan');
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return { data, setData, error, run };
};