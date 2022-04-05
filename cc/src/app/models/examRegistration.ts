import { ExamPeriod } from "./examPeriod";
import { Student } from "./student";
import { Subject } from "./subject";

export interface ExamRegistration {
    _id: string;
    student: Student;
    subject: Subject;
    examinationPeriod : ExamPeriod;
    mark: number;
}