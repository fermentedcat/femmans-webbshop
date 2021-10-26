import { useState, useEffect, useContext } from 'react';
import { UiContext } from '../context/uiContext';

export const useFetch = (callback, ...callbackArguments) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { setNotification } = useContext(UiContext);

  useEffect(() => {
    callback(...callbackArguments)
      .then((res) => setData(res.data))
      .catch((error) => {
        setError(error)
        setNotification({
          type: 'error',
          message: 'Misslyckades med att hämta data.',
        });
      });
  }, [...callbackArguments])


  return { data, setData, error };
};