
 export interface ResponseCreateRequestInterface {
    serviceId:   ServiceID;
    installerId: User;
    customerId:  User;
    addressName: string;
    coordinates: Coordinates;
    _id:         string;
    createdAt:   Date;
 }
 
 export interface Coordinates {
    latitude:  number;
    longitude: number;
    _id:       string;
 }
 
 export interface User {
    score:    number;
    _id:      string;
    name:     string;
    lastName: string;
    picture:  string;
 }
 
 export interface ServiceID {
    _id:         string;
    name:        string;
    description: string;
    price:       number;
 }
 