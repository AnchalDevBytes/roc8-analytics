export interface User {
    id : number,
    name : string,
    email : string,
    createdAt : Date
    updatedAt : Date
}

export interface SignupResponseDataInterface {
    success: boolean,
    message: string,
    user: User,
}