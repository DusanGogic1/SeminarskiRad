import { Component, OnInit } from '@angular/core';
import { ExamRegistration } from 'src/app/models/examRegistration';
import { StudentService } from 'src/app/services/student/student.service';
import { Token } from 'src/app/models/token';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registered-exams',
  templateUrl: './registered-exams.component.html',
  styleUrls: ['./registered-exams.component.css']
})
export class RegisteredExamsComponent implements OnInit {


  examRegistrations? : ExamRegistration[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {

    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });

    this.studentService.getExamRegistrations(decoded._id)
      .subscribe(examRegistrations =>
         this.examRegistrations = examRegistrations);

  }

}
