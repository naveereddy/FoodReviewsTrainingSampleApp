import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../modals/user';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginResponse: Object;
  private loginUrl = environment.apiEndpoint+'users/login';
  constructor(private http: HttpClient) { }
  
/**
 * Login request to server
 * @param user 
 */
  loginUser (user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user, httpOptions).pipe(
      tap((user: any) => {
      this.loginResponse = user;
      sessionStorage.setItem('loginUser', JSON.stringify(user));
      this.log(`added hero w/ username=${user.username}`)}
    ),
      catchError(this.handleError<User>('loginUser'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
 /**
  * Log a HeroService message with the MessageService 
  * @param message 
  */
  private log(message: string) {
    console.log('Login Service ----', message);
  }
  getloginResponse() {
    return this.loginResponse;
  }
}
