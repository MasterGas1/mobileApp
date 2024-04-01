export interface UserInterface {
    name:     string;
    lastName: string;
    email:    string;
    password: string;
}

export interface CustomerInterface {
    rfc: string;
    taxResidence: string;
}

export interface UserRequestInterface extends UserInterface, CustomerInterface {}

export interface UserSignUpScreenInterface {
   form : UserInterface
}

export interface UserSignUpFormInterface { 
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
}
