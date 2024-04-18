export interface ServiceInterface {
    name:        string;
    description: string;
    image:       string;
    type:        string;
    price:       number;
    subServices: any[];
    available:   boolean;
    _id:         string;
    deleted:     boolean;
    __v:         number;
}