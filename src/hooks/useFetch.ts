import { useState, useCallback } from 'react';
import { FetchState } from '../types';

const useFetch = <T>(url: string) => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const fetchData = useCallback(async () => {
    setFetchState((prevState) => ({
      ...prevState,
      loading: true,
      error: undefined,
    }));
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: T = await response.json();
      setFetchState((prevState) => ({
        ...prevState,
        data,
        loading: false,
        error: undefined,
      }));
    } catch (error: any) {
      setFetchState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message || 'Something went wrong',
      }));
    }
  }, [url]);

  return { fetchState, fetchData };
};

export default useFetch;
