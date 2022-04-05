import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamPeriod } from 'src/app/models/examPeriod';
import { Professor } from 'src/app/models/professor';
import { ProfessorParam } from 'src/app/models/professorParam';
import { Student } from 'src/app/models/student';
import { StudentParam } from 'src/app/models/studentParam';
import { Subject } from 'src/app/models/subject';
import { SubjectParam } from 'src/app/models/subjectParam';
import { Way } from 'src/app/models/way';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    var token = localStorage.getItem('token') as string;
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', `Bearer ` + token);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:5000/admin/getStudents", {
      headers: this.headers,
    });
  }

  deleteStudent(student: string): void {
    this.http.delete(
      "http://localhost:5000/admin/deleteStudent/" + student, {
      headers: this.headers,
      observe: 'response'
    }).subscribe(response => console.log(response.status));
  }

  addStudent(student: StudentParam): void {
    this.http.post("http://localhost:5000/auth/addStudent", {
      student,
    }, { headers: this.headers, observe: 'response' })
      .subscribe(response => { console.log(response); }, err => { console.log(err) });
  }


  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>("http://localhost:5000/admin/getProfessor", {
      headers: this.headers,
    })
  }

  addProfessor(professor: ProfessorParam): void {
    this.http.post("http://localhost:5000/auth/addProfessor",
      { professor }, { headers: this.headers }).subscribe(response => response);
  }

  deleteProfessor(professor: string): void {
    this.http.delete(
      "http://localhost:5000/admin/deleteProfessor/" + professor, {
      headers: this.headers,
      observe: 'response'
    }).subscribe(response => console.log(response));
  }


  getSubjects(way: string): Observable<Subject[]> {
    return this.http.get<Subject[]>("http://localhost:5000/admin/getSubjects/" + way, {
      headers: this.headers,
    });
  }

  addSubject(subject: SubjectParam): void {
    this.http.post("http://localhost:5000/admin/addSubject",
      { subject },
      { headers: this.headers }).subscribe(response => response);
  }

  deleteSubject(id: string): void {
    this.http.delete("http://localhost:5000/admin/deleteSubject/" + id,
      { headers: this.headers }).subscribe(response => response);
  }


  addWay(name: string): void {
    this.http.post("http://localhost:5000/admin/addWay",
      { name },
      { headers: this.headers }).subscribe(response => response);
  }

  getWays(): Observable<Way[]> {
    return this.http.get<Way[]>("http://localhost:5000/admin/getWays", { headers: this.headers });
  }

  openExamPeriod(period: ExamPeriod): void {
    this.http.post("http://localhost:5000/admin/openExaminationPeriod",
      { period },
      { headers: this.headers }).subscribe(response => response);
  }
}
