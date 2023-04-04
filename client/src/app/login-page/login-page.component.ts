import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces/user";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent {

  form: FormGroup;
  submitted:boolean = false

  constructor(private authService: AuthService,
              private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required]),
      password: new FormControl(null, [
        Validators.required])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user:User = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.authService.signIn(user).subscribe(()=> {
      this.form.reset()
      this.router.navigate(["/"])
      this.submitted = false
    })
  }
}
