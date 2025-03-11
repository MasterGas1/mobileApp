import {useEffect, useState} from 'react';

import {ResponseCreateRequestInterface} from '../interface/requestInterface';

import dbApi from '../api/DbApi';

export const useRquest = () => {
  const [request, setRequest] = useState<ResponseCreateRequestInterface[]>([]);
  const [requestSelected, setRequestSelected] =
    useState<ResponseCreateRequestInterface>();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const {data} = await dbApi.get<ResponseCreateRequestInterface[]>(
          '/request/all/installer/token',
        );
        setRequest(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRequests();
  }, []);

  const getOneRequest = async (id: string) => {
    try {
      const {data} = await dbApi.get<ResponseCreateRequestInterface>(
        `/request/all/installer/token/${id}`,
      );
      console.log(data.coordinates.longitude);
      setRequestSelected(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearRequest = () => {
    setRequest([]);
    setRequestSelected(undefined);
  };

  const addRequest = (request: ResponseCreateRequestInterface) => {
    setRequest(prev => [...prev, request]);
  };

  return {
    request,
    requestSelected,
    addRequest,
    getOneRequest,
    clearRequest,
  };
};
