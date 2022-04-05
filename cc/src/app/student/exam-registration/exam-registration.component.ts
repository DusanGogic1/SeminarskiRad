import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/models/examPeriod';
import { Subject } from 'src/app/models/subject';
import { StudentService } from 'src/app/services/student/student.service';
import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css']
})
export class ExamRegistrationComponent implements OnInit {

  subjects?: Subject[];
  period: ExamPeriod = {} as ExamPeriod;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    var token = localStorage.getItem("token") as string;
    var decoded = jwt_decode<Token>(token, { header: false });

    this.studentService.getSubjects(decoded._id)
      .subscribe(subjects => {
        this.subjects = subjects;
      });

    this.studentService.getOpenedPeriod()
      .subscribe(opened => this.period = opened);
  }

  registerExam(subject: string): void {
    var token = localStorage.getItem("token") as string;
    var decoded = jwt_decode<Token>(token, { header: false });
    var id = decoded._id;
    this.studentService.registerExam(id, subject
      , this.period.name, this.period.year);

    window.location.reload();
  }

}
