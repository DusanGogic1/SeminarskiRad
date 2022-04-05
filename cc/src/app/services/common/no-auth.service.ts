import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/models/token';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class NoAuthService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem("token") != null) {
      var token = localStorage.getItem("token") as string;
      if (jwtHelper.isTokenExpired(token)) return true;
      else {
        var decoded = jwt_decode<Token>(token, { header: false });
        
        if(decoded.role != undefined) {
          var role = decoded.role;
          if(role == "ROLE_STUDENT")
            this.router.navigate(['student/info']);
          else if(role == "ROLE_ADMIN")
            this.router.navigate(['admin/students']);
          else this.router.navigate(['professor/info']);
        }
        return false;
      }
    }
    return true;
  }
}
