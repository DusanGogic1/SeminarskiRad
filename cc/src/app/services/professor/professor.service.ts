import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamRegistration } from 'src/app/models/examRegistration';
import { Professor } from 'src/app/models/professor';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    var token = localStorage.getItem('token') as string;
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Authorization', `Bearer ` + token);
   }

   getInfo(id: string): Observable<Professor> {
     return this.http.get<Professor>("http://localhost:5000/professor/getInfo/" + id,
      {headers: this.headers});
   }

   getSubjects(id: string): Observable<Subject[]> {
     return this.http.get<Subject[]>("http://localhost:5000/professor/getSubjects/" + id,
      {headers: this.headers})
   }

   getStudents(id: string): Observable<Student[]> {
     return this.http.get<Student[]>("http://localhost:5000/professor/getStudentsForSubject/" + id,
      {headers: this.headers});
   }

   getStudentsForFilling(id: string): Observable<ExamRegistration[]> {
     return this.http.get<ExamRegistration[]>("http://localhost:5000/professor/getStudentsForFillingMarks/" + id,
      {headers: this.headers});
   }

   examMarking(id: string, mark: Number): Observable<string> {
     console.log(id, mark);
     console.log("http://localhost:5000/professor/examMarking/" + id + "/" + mark);
     return this.http.put<string>("http://localhost:5000/professor/examMarking/" + id + "/" + mark, null,
       {headers: this.headers}
     );
   }
}
