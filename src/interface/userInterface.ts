export interface UserResponseLoginInterface {
  _id: string;
  name: string;
  lastName: string;
  token: string;
  role: string;
  picture: string;
  status: string;
}

export interface UserResponseTokenInterface {
  _id: string;
  name: string;
  lastName: string;
  picture: string;
  roleId: {
    name: string;
  };
}

export interface CustomerByTokenInterface {
  _id: string;
  name: string;
  lastName: string;
  picture: string;
}
