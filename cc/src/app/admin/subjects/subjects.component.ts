import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { Way } from 'src/app/models/way';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  ways?: Way[];
  subjects: Map<string, Subject[]> = new Map<string, Subject[]>();


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getWays().subscribe(ways => {
      this.ways = ways;
      for (let way of ways) {
        this.adminService.getSubjects(way._id)
          .subscribe(subjects => {
            this.subjects.set(way.name, subjects);
          });
      }
    });
  }

  deleteSubject(id: string): void {
    this.adminService.deleteSubject(id);
    window.location.reload();
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  checkKey(key: string) {
    var a = this.subjects.get(key);
    if(a == null) return false;
    else return a.length !== 0;
  }

}
