import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { StudentService } from 'src/app/services/student/student.service';
import { Token } from 'src/app/models/token';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-not-passed-exams',
  templateUrl: './not-passed-exams.component.html',
  styleUrls: ['./not-passed-exams.component.css']
})
export class NotPassedExamsComponent implements OnInit {

  subjects?: Subject[]

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });
    this.studentService.getNotPassedExams(decoded._id)
      .subscribe(subjects => {
        this.subjects = subjects;
        console.log(subjects);
      });
  }

}
