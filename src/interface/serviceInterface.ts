export interface ServiceInterface {
    name:        string;
    description: string;
    image:       string;
    type:        string;
    price:       number;
    subservicesId: any[];
    available:   boolean;
    _id:         string;
    __v:         number;
}