import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ExamPeriod } from 'src/app/models/examPeriod';
import { Subject } from 'src/app/models/subject';
import { ExamRegistration } from 'src/app/models/examRegistration';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    var token = localStorage.getItem('token') as string;
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', `Bearer ` + token);
  }

  getInfo(id: string): Observable<Student> {
    return this.http.get<Student>("http://localhost:5000/student/getInfo/" + id, {
      headers: this.headers,
    });
  }

  getSubjects(id: string): Observable<Subject[]> {
    return this.http.get<Subject[]>("http://localhost:5000/student/examsICanRegister/" + id, {
      headers: this.headers,
    });
  }

  registerExam(student: string, subject: string,
    periodName: string, year: Number): void {
    this.http.post("http://localhost:5000/student/examRegistration",
      {
        'student': student, 'subject': subject, 'year': year, 'periodName': periodName
      }, { responseType: "text", headers: this.headers })
      .subscribe(response => response);
  }

  getOpenedPeriod(): Observable<ExamPeriod> {
    return this.http
      .get<ExamPeriod>('http://localhost:5000/student/getOpenedPeriods',
        { headers: this.headers });
  }

  getExamRegistrations(id: string): Observable<ExamRegistration[]> {
    return this.http
      .get<ExamRegistration[]>("http://localhost:5000/student/getExamRegistrations/" + id, {
        headers: this.headers,
      });
  }

  getNotPassedExams(id: string): Observable<Subject[]> {
    return this.http
      .get<Subject[]>("http://localhost:5000/student/getNotPassedExams/" + id, {
        headers: this.headers,
      });
  }
}
