export interface AddressResponseInterface {
    _id: string
    name: string
    addressName: string
    coordinates: {latitude: number, longitude: number}
}

export interface AddressInterface {
    name: string
    addressName: string
    coordinates: {latitude: number, longitude: number}
}