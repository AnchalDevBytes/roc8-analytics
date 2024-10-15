import { ChangeEventHandler } from "react";

export interface labelledInputType {
    label : string,
    id: string,
    type?: "text" | "password" | "email",
    placeholder: string,
    changeHandler: ChangeEventHandler
}