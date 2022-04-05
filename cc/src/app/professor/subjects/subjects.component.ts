import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { Token } from 'src/app/models/token';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class ProfessorSubjectsComponent implements OnInit {

  subjects? : Subject[];

  constructor(private professorService: ProfessorService,
    private router: Router) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });
    this.professorService.getSubjects(decoded._id)
      .subscribe(subjects => this.subjects = subjects);
  }

  getStudents(id: string) {
    this.router.navigate(['professor/subject/' + id]);
  }

  fillInMarks(id: string) {
    this.router.navigate(['professor/fillSubject/' + id]);
  }

}
