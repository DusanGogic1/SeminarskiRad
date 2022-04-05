import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { SubjectParam } from 'src/app/models/subjectParam';
import { Way } from 'src/app/models/way';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit {

  ways?: Way[];
  professors?: Professor[];

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.adminService.getWays()
      .subscribe(ways => this.ways = ways);
    this.adminService.getProfessors()
      .subscribe(professors => this.professors = professors);
  }

  addSubject(myForm: NgForm) : void {
    var subject = {} as SubjectParam;

    subject.name = myForm.value.name;
    subject.espb = myForm.value.espb;
    subject.way = myForm.value.way;
    subject.yearOfStudy = myForm.value.yearOfStudy;
    subject.professor = myForm.value.professor;

    this.adminService.addSubject(subject);

    this.router.navigate(['admin/subjects']);
  }

}
