import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    var token = localStorage.getItem('token') as string;
    var decoded = jwt_decode<Token>(token, { header: false });
    this.username = decoded.username;

  }

  logout() : void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
