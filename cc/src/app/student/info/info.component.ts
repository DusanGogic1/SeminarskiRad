import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student/student.service';
import { Token } from 'src/app/models/token';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-student-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class StudentInfoComponent implements OnInit {

  student?: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });

    this.studentService.getInfo(decoded._id)
      .subscribe(student => this.student = student);
  }

}
