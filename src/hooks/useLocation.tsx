import React, {useState} from 'react';
import {LocationInterface} from '../interface/locationInterface';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationInterface>({
    latitude: 0,
    longitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState<LocationInterface>({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState<string>('');
  const [currentAddress, setCurrentAddress] = useState<string>('');

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(async ({coords}) => {
      const request = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyBnYn-5NlhuQnRUugaQOVS4t1nsKeo0toA`,
      );
      setAddress(request.data.results[0].formatted_address);
      setCurrentAddress(request.data.results[0].formatted_address);
      setLocation({latitude: coords.latitude, longitude: coords.longitude});
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    });
  };

  const setNewLocation = (latitude: number, longitude: number) => {
    setLocation({latitude, longitude});
  };

  return {
    location,
    address,
    currentLocation,
    currentAddress,
    getCurrentLocation,
    setNewLocation,
  };
};
