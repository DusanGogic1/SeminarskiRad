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
export class AdminAuthService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem("token") != null) {
      var token = localStorage.getItem("token") as string;
      console.log(token);
      if (jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['']);
        return false;
      }
      else {
        var decoded = jwt_decode<Token>(token, { header: false });
        console.log(decoded);
        var isAdmin: boolean;
        if (decoded.role == "ROLE_ADMIN") isAdmin = true;
        else isAdmin = false;

        if (isAdmin)
        return isAdmin;
      }
    }
    this.router.navigate(['']);
    return false;
  }
}
