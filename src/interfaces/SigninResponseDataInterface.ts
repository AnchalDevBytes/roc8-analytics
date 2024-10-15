export interface User {
    id : number,
    name : string,
    email : string,
    createdAt : Date
    updatedAt : Date
}

export interface SigninResponseDataInterface {
    success: boolean,
    message: string,
    user: User,
}