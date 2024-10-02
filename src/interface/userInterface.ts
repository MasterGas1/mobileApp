
export interface UserResponseLoginInterface {
    name: string
    lastName: string
    token: string
    role: string
}


export interface UserResponseTokenInterface {
    _id: string
    name: string
    lastName: string
    roleId: {
        name: string
    }
}


export interface CustomerByTokenInterface {
    _id: string
    name: string
    lastName: string 
}