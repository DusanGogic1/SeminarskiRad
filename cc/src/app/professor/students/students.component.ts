import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class ProfessorStudentsComponent implements OnInit {

  students?: Student[];
  constructor(private professorService: ProfessorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    this.professorService.getStudents(id)
      .subscribe(students => this.students = students);
  }

}
