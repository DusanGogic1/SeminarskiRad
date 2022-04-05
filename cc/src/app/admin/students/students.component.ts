import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students?: Student[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  deleteStudent(id: string) : void {
    this.adminService.deleteStudent(id);
    window.location.reload();
  }


}
