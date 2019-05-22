import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

/**
 * The Login component
 * 
 * @class LoginComponent
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * The Reactive Form object
   */
  loginForm: FormGroup;
 
  /**
   * Is true if the Login button was clicked and the authentication process started running
   */
  loading = false;
  
  /**
   * Is true if the Login button was clicked, helps displaying client-side validation errors on the input fields
   */
  submitted = false;

  /**
   * Stores the URL of the originating page, the component uses this value to navigate the user to the right page after successful authentication
   */
  returnUrl: string;
  
  /**
   * The error messages coming from the {@link AuthService} are stored here
   */
  error = "";

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  /**
   * Gets all the controls from the login form
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Executed when clicking on the Login button.
   * Validates the login form and calls the {@link AuthService} to authenticate the credentials entered into the form
   */
  OnSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.error = "";
    this.loading = true;

    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnUrl])
    }, err => {
      this.error = err.error;
      this.loading = false;
    });
  }

}
