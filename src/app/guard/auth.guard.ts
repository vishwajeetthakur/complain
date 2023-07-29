import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.IsloggedIn()) {
      return true;
    } else {
      this.router.navigate(['login'])
      return false;
    }
  }
}
