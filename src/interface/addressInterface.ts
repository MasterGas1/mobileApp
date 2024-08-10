export interface AddressResponseInterface {
    _id: string
    name: string
    addressName: string
    coords: {latitude: number, longitude: number}
}

export interface AddressInterface {
    name: string
    addressName: string
    coords: {latitude: number, longitude: number}
}