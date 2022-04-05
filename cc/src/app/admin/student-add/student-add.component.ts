import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Way } from 'src/app/models/way';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NgForm } from '@angular/forms';
import { StudentParam } from 'src/app/models/studentParam';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  ways?: Way[];

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.adminService.getWays().subscribe(ways => this.ways = ways);

  }

  async addStudent(myForm: NgForm): Promise<void> {
    var student = {} as StudentParam;

    student.username = myForm.value.susername;
    student.password = myForm.value.password;
    student.index = myForm.value.index;
    student.firstName = myForm.value.firstName;
    student.lastName = myForm.value.lastName;
    student.cuin = myForm.value.cuin;
    student.email = myForm.value.email;
    student.way = myForm.value.way;
    student.status = myForm.value.status;
    student.type = myForm.value.type;
    student.yearOfStart = Number(myForm.value.startYear);
    student.yearOfStudy = Number(myForm.value.studyYear);

    this.adminService.addStudent(student);

    await timer(200).pipe(take(1)).toPromise();


    this.router.navigate(['admin/students']);
  }

}
