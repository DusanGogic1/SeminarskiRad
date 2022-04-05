import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Way } from 'src/app/models/way';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-way-add',
  templateUrl: './way-add.component.html',
  styleUrls: ['./way-add.component.css']
})
export class WayAddComponent implements OnInit {

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addWay(myForm: NgForm): void {
    var way = {} as Way;

    way.name = myForm.value.name;

    this.adminService.addWay(way.name);
    this.router.navigate(['admin/students']);
  }

}
