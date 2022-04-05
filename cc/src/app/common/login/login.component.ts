import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  login(myForm: NgForm) {
    this.commonService.login(myForm.value.username,
      myForm.value.password);
  }

}
