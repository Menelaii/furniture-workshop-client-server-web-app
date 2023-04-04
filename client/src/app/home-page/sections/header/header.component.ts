import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  constructor(private router: Router,
              private service: AuthService) {
  }

  onLogoClick() {
    if (this.service.isAuthenticated()) {
      this.service.signOut()
      window.location.reload()
    } else {
      this.router.navigate(['/login'])
    }
  }
}
