export interface INanny {
    firstName: string;
    lastName: string;
    gender: string;
    yearOfExp: string;
    uid: string;
    location?: string;
    timestamp?: Date;
    age?: string;
    rate: number;
}

export interface IUser{
    userId?: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    saveCart?: string | null;
    admin?: boolean | null;
}

export interface Star {
    userId: string;
    nannyId: string;
    value: number;
}

export interface ICreditCard {
    creditCardNo: number;
    cvv: number;
    expDate: String;
    name: string;
}

export interface IAddress {
    address1: string,
    address2?: string | null,
    city: string,
    country: string,
    state: string,
    zipCode: string
}