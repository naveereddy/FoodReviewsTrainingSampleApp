import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Review } from '../modals/review';
import { ReviewsCount } from '../modals/reviews-count';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  reviews: any[];
  reviewscount:any[];
  constructor(private http: HttpClient, private loginService: LoginService) { }
  loginRes?: any = JSON.parse(sessionStorage.getItem('loginUser'));
  private reviewUrl =environment.apiEndpoint +'reviews/';
  private ignorereviewUrl =environment.apiEndpoint +'reviews/ignored/';
  private tagreviewUrl =environment.apiEndpoint +'reviews/taged/';

  /** 
   * GET total reviews from the server 
   */
  getreviews (): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewUrl + this.loginRes.collection)
      .pipe(
        tap(reviews => this.log(`fetched reviews`)),
        catchError(this.handleError('getReviews', []))
      );
  }
  /** 
   *GET ignored reviews from the server 
   */
  getignorereviews (actiontype): Observable<Review[]> {
    return this.http.get<Review[]>(this.ignorereviewUrl + this.loginRes.collection+'/'+actiontype)
      .pipe(
        tap(reviews => this.log(`fetched ignored reviews`)),
        catchError(this.handleError('getReviews', []))
      );
  }
  /** 
   * GET not reviewed reviews from the server 
   */
  gettagedreviews (actiontype): Observable<Review[]> {
    return this.http.get<Review[]>(this.tagreviewUrl + this.loginRes.collection+'/'+actiontype)
      .pipe(
        tap(reviews => this.log(`fetched not reviewed reviews`)),
        catchError(this.handleError('getReviews', []))
      );
  }
  /**
   * GET reviewed reviews from the server 
   */
  getreviewsCount (): Observable<ReviewsCount> {
    return this.http.get<any>(this.reviewUrl + 'reviews_count/' + this.loginRes.collection)
      .pipe(
        tap(reviewscount => this.log(`fetched reviews count`)),
        catchError(this.handleError('getReviews', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /**
   * Log a HeroService message with the MessageService 
   * @param message 
   */
  private log(message: string) {
    console.log('review Service ----', message);
  }
}
