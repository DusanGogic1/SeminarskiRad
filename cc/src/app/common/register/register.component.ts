import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username? : any;
  password? : any;

  constructor(private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
  }

  register() {
    this.commonService.register(this.username,
      this.password);
    this.router.navigate(['']);
  }

}
