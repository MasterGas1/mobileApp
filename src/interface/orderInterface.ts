import {User} from './requestInterface';
export interface OrderResponseInterface {
  serviceId: ServiceID;
  installerId: UserID;
  customerId: UserID;
  price: number;
  state: string;
  addressName: string;
  coordinates: Coordinates;
  _id: string;
  createdAt: Date;
  __v: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  _id: string;
}

export interface UserID {
  score: number;
  _id: string;
  name: string;
  lastName: string;
  picture: string;
  installerId?: InstallerID;
}

export interface InstallerID {
  _id: string;
  phoneNumber: string;
}

export interface ServiceID {
  _id: string;
  name: string;
  price: number;
}
