import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from '../../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../modals/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../environments/environment';

//  http header decalaration
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private loginService: LoginService,
      private flashMessagesService:FlashMessagesService
    ) {}

  ngOnInit() {
     // Login from validation
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
 
/**
 * Calling login service getting collection name for this login user, and based on that collection getting all reviews
 */
    this.loginService.loginUser({username: this.f.username.value, password: this.f.password.value})
      .subscribe(
        (reuser: any) => {
        if (reuser.hasOwnProperty('message')) {
           this.loading = false;
           this.flashMessagesService.grayOut(true);
           this.flashMessagesService.show(reuser.message, {
            cssClass: 'alert-warning',
            timeout: 5000
        });
        } else {
          this.getTags();
          this.router.navigate(['dashboard']);
        }
      }, error => {
        this.loading = false;
      });
    }
    /**
     * Getting tags from server and storing into session storage 
     */
    getTags() {
      const url = environment.apiEndpoint +'tags';
      this.http.get(url)
      .subscribe((data: any) => {
        console.log("tags data",data);
        sessionStorage.setItem('tags', JSON.stringify(data));
      });
    }

}
