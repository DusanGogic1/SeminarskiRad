import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) { }

    login(username: string, password: string): void {

      this.http.post<string>("http://localhost:5000/auth/login", {
        'username': username,
        'password': password
      }
      ).subscribe(token => {
        if (token != "Wrong password")
          localStorage.setItem("token", token);
          var role = jwt_decode<Token>(token).role;
          if(role == "ROLE_ADMIN")
            this.router.navigate(['/admin/students']);
          else if(role == "ROLE_STUDENT")
            this.router.navigate(['student/info']);
          else if(role == "ROLE_PROFESSOR")
            this.router.navigate(['professor/info'])
          else
            this.router.navigate(['']);
        }
      );
    }

    register(username: string, password: string): void {

      this.http.post<string>("http://localhost:5000/auth/register", {
        'username': username,
        'password': password
      }
      ).subscribe(value =>
        this.cookieService.set("register", value)
      );
    }
}
