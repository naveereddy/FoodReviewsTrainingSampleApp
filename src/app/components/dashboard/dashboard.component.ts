import { Component, OnInit } from '@angular/core';
import { ReviewServiceService } from '../../services/review-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //instase variable for login component
  reviews: any[];
  pendingreviews = true;
  ignoredreviews = false;
  tagedreviews = false;
  public loading = false;
  actiontype:string='genral';
  reviewCounts = {
    total_reviewscount: 0,
    ignore_reviewscount: 0,
    taged_reviewscount: 0
  };
  sidebarwidth: number = 250;
  panelmargin: number = 265;
  loginRes: any = JSON.parse(sessionStorage.getItem('loginUser'));

  constructor(private http: HttpClient,
    private reviewService: ReviewServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._reviewscount();
    this._loadreviews();
  }
  /**
  * Pending review action. if user will click this button we are showing pending reviews one by one
  */
  pendingreviewsAction() {
    this.pendingreviews = true;
    this.ignoredreviews = false;
    this.tagedreviews = false;
    this._loadreviews();
  }
  /**
  *Ignored review action. if user will click this button we are showing pending reviews one by one
  */
  ignoredreviewsAction() {
    this.pendingreviews = false;
    this.ignoredreviews = true;
    this.tagedreviews = false;
    this._loadreviews();
  }
  /**
  *Taged review action. if user will click this button we are showing pending reviews one by one
  */
  tagedreviewsAction() {
    this.pendingreviews = false;
    this.ignoredreviews = false;
    this.tagedreviews = true;
    this._loadreviews();
  }
  /**
   * By this action we are showing next and previous reviews
   * @param evnt actiontype means it can be ignore , pending , next
   */
  newIgnoreAndTagedReviewsCount(evnt) {
    this._reviewscount();
    this.reviews = [];
    console.log('evnt data',evnt)
    if (this.reviews.length == 0) {
       if(evnt.hasOwnProperty('actiontype')){
         this.actiontype = evnt.actiontype;
       }
       this._loadreviews();
    }
  }
  /**
  *Getting all ( pending, taged , ignore ) reviews count
  */
  _reviewscount() {
    this.reviewService.getreviewsCount()
      .subscribe((response: any) => {
        this.reviewCounts = response;
      });
  }
  /**
   *  Loding default reviews
   */
  _loadreviews() {
    this.loading= true;
    if (this.pendingreviews) {
      this.reviewService.getreviews()
        .subscribe((response: any) => {
          this.loading= false;
          response.map(function (obj) {
            obj.reviewtype = "pending";
            return obj;
          });
          this.reviews = response;
        });
    } else if (this.ignoredreviews) {
      this.reviewService.getignorereviews(this.actiontype)
        .subscribe((response: any) => {
          this.loading= false;
          response.map(function (obj) {
            obj.reviewtype = "ignore";
            return obj;
          });
          this.reviews = response;
        });
    } else if (this.tagedreviews) {
      this.reviewService.gettagedreviews(this.actiontype)
        .subscribe((response: any) => {
          this.loading= false;
          response.map(function (obj) {
            obj.reviewtype = "taged";
            return obj;
          });
          this.reviews = response;
        });
    }
  }
  /**
  * Side bar (hamburger menu)opeing and closing action
  */
  openNav() {
    if (this.sidebarwidth == 0) {
      this.sidebarwidth = 250;
      this.panelmargin = 265;
    } else {
      this.sidebarwidth = 0;
      this.panelmargin = 15;
    }
  }
  /**
   *Clear all session storge date for this user and showing login screen for new user login
   or new session for username user
   */
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
