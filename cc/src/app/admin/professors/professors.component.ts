import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {

  professors?: Professor[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getProfessors().subscribe(professors => {
      this.professors = professors;
    });
  }

  deleteProfessor(id: string) : void {
    this.adminService.deleteProfessor(id);
    window.location.reload();
  }

}
