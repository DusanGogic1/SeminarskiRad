import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamPeriod } from 'src/app/models/examPeriod';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-exam-period-opening',
  templateUrl: './exam-period-opening.component.html',
  styleUrls: ['./exam-period-opening.component.css']
})
export class ExamPeriodOpeningComponent implements OnInit {

  constructor(private adminService: AdminService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  openPeriod(myForm: NgForm) : void {
    var examPeriod = {} as ExamPeriod;

    examPeriod.name = myForm.value.name;
    examPeriod.year = myForm.value.year;
    examPeriod.opening = myForm.value.opening;
    examPeriod.closing = myForm.value.closing;

    this.adminService.openExamPeriod(examPeriod);
    this.router.navigate(['admin/subjects']);
  }

}
