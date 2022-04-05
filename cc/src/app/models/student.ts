import { Way } from "./way";

export interface Student {
    _id: string;
    username: string;
    index: string;
    firstName: string;
    lastName: string;
    cuin: string;
    email: string;
    way: Way;
    status: string;
    type: string;
    yearOfStart: number;
    yearOfStudy: number;
}