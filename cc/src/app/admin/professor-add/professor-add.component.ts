import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessorParam } from 'src/app/models/professorParam';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-professor-add',
  templateUrl: './professor-add.component.html',
  styleUrls: ['./professor-add.component.css']
})
export class ProfessorAddComponent implements OnInit {

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  addProfessor(myForm: NgForm): void {
    var professor = {} as ProfessorParam;

    professor.username = myForm.value.pusername;
    professor.password = myForm.value.password;
    professor.firstName = myForm.value.firstName;
    professor.lastName = myForm.value.lastName;
    professor.email = myForm.value.email;
    professor.cuin = myForm.value.cuin;
    professor.title = myForm.value.title;

    this.adminService.addProfessor(professor);
    this.router.navigate(['admin/professors']);
  }

}
