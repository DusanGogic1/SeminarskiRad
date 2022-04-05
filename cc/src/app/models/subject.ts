import { Professor } from "./professor";
import { Way } from "./way";

export interface Subject {
    _id: string;
    name: string;
    ESPB: string;
    way: Way;
    yearOfStudy: Number;
    professor: Professor;
}
