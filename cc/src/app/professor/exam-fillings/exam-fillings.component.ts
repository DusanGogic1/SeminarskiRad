import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExamRegistration } from 'src/app/models/examRegistration';
import { ProfessorService } from 'src/app/services/professor/professor.service';

@Component({
  selector: 'app-exam-fillings',
  templateUrl: './exam-fillings.component.html',
  styleUrls: ['./exam-fillings.component.css']
})
export class ExamFillingsComponent implements OnInit {

  examRegistrations?: ExamRegistration[];

  constructor(private professorService: ProfessorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    this.professorService.getStudentsForFilling(id)
      .subscribe(examRegistrations => {
        this.examRegistrations = examRegistrations;
        console.log(this.examRegistrations != undefined);
      });
  }

  fillInMark(id: string, myForm : NgForm) {
    this.professorService.examMarking(id, myForm.value.mark).subscribe(a => a);
    window.location.reload();
  }

}
