import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { Token } from 'src/app/models/token';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-professor-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class ProfessorInfoComponent implements OnInit {

  professor?: Professor;
  
  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });

    this.professorService.getInfo(decoded._id)
      .subscribe(professor => this.professor = professor);
  }

}
