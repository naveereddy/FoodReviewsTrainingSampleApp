import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Review } from '../../modals/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { ReviewServiceService } from '../../services/review-service.service';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { retryWhen } from 'rxjs/internal/operators/retryWhen';
import { DomSanitizer } from "@angular/platform-browser";
 // Heardes options
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  /* Instance varibles */
  display = 'none';
  tags: any[];
  savetags: any[] = [];

  // Inputbing for dashboard
  @Input() review: any;

  // Outputbinding from reviews to dashboard, based on the action of button
  @Output() getNewReviewsCountChange = new EventEmitter<any>();
  public loginUrl = environment.apiEndpoint + 'reviews/';
  loginRes: any = JSON.parse(sessionStorage.getItem('loginUser'));

  //Fixed height for the review description and review title and business name card
  @ViewChild('reviewtext') elementView: ElementRef;
  reviewHeight: number = 90;
  @ViewChild('reviewbodyheight') rbodyheightView: ElementRef;
  rbodyheight: number = 90;

  public loading = false;
  constructor(private http: Http, private reviewServiceService: ReviewServiceService,private sanitizer: DomSanitizer) { }
  ngOnInit() {
   //Getting all tags from the session storage.
    this.tags = JSON.parse(sessionStorage.getItem('tags'));
    this.savetags = [];
    if (this.review && this.review.reviewtype == 'taged') {
      this.savetags = this.review.review.tags;
      this.updatetags()
    }
  }
  /**
   * Updating the review body and title height based on the text
   */
  ngAfterViewInit(){
    this.reviewHeight = this.elementView.nativeElement.offsetHeight;
    this.rbodyheight = this.rbodyheightView.nativeElement.offsetHeight -(this.reviewHeight+98);
      console.log("this.reviewHeight",this.reviewHeight,this.rbodyheight);
  }

  /**
   * Loding tags
   */
  updatetags() {
    var self = this;
    this.tags.forEach(function (tagobj) {
      tagobj.tags.forEach(function (emtobj) {
        self.savetags.forEach(function (saveemt) {
          if (saveemt.tag == emtobj.tag) {
            emtobj.reason = saveemt.reason;
            emtobj.emotions.forEach(function (em) {
              if (em.emotion == saveemt.emotion) {
                em.checked = true;
              }
            })
          }

        })
      })
    });
  }

  /**
   * Ignored review updating to server, and updating event to dashboard
   * @param review selected review
   */
  ignorereview(review: any) {
    this.loading= true;
    const url = this.loginUrl + 'updaterev/' + review.review._key;
    const ignoreObj: Object = {
      'ignore': true,
      'collection': this.loginRes.collection
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(review.review);
      });

  }

/**
 * Don't ignore review send to server action, and updating event to dashboard
 * @param review selected review
 */
  dontignoreAction(review: any) {
    this.loading= true;
    const url = this.loginUrl + "unignore/" + review.review._key;
    const ignoreObj: Object = {
      'collection': this.loginRes.collection
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(review.review);
      });
  }

  /**
   * Taged ignore button action, and updating event to dashboard
   * @param review selected review
   */
  tagedignorereview(review: any) {
    this.loading= true;
    const url = this.loginUrl + "tagedignore/" + review.review._key;
    const ignoreObj: Object = {
      'collection': this.loginRes.collection
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(review.review);
      });
  }

 /**
  * On save ignore button action, and updating event to dashboard
  * @param review Selected review
  */
  onSaveignoredtags(review: any) {
    this.loading= true;
    const url = this.loginUrl + "ignoretotaged/" + review.review._key;
    const ignoreObj: Object = {
      'tags': this.savetags,
      'collection': this.loginRes.collection
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(review.review);
      });
  }
/**
 * Next button action, and updating event to dashboard
 * @param review seleted review
 * @param action action type next or previous
 */
  nextAction(review: any, action) {
    this.loading= true;
    review.review.actiontype = action;
    if (action == "next") {
      const url = this.loginUrl + "modifieddate/" + review.review._key;
      const ignoreObj: Object = {
        'collection': this.loginRes.collection
      };
      this.http.patch(url, ignoreObj)
        .subscribe((data: any) => {
          this.loading= false;
          this.getNewReviewsCountChange.emit(review.review);
        });
    } else {
      this.getNewReviewsCountChange.emit(review.review);
    }
  }
  addTags(review: any) {
    this.tags = JSON.parse(sessionStorage.getItem('tags'));
    this.display = 'block';
  }
  onSaveHandled() {
    this.tagsSave();
    this.display = 'none';
  }
  onCloseHandled() {
    this.display = 'none';
  }
 /**
  * Selecting emtion for the perticular food review based on the review description
  * @param data 
  * @param evt 
  * @param tagindex 
  * @param emindex 
  * @param emtindex 
  */
  oncheckboxChange(data, evt, tagindex, emindex, emtindex) {
    this.savetags = _.without(this.savetags, _.find(this.savetags, {
      tag: this.tags[tagindex].tags[emindex].tag
    }));
    if (evt.target.checked == true) {
      let pObj: Object;
      if (this.tags[tagindex].tags[emindex].reason == undefined || this.tags[tagindex].tags[emindex].reason == "") {
        pObj = { 'tag': this.tags[tagindex].tags[emindex].tag, 'emotion': evt.target.value, "reason": "" };
      } else {
        pObj = { 'tag': this.tags[tagindex].tags[emindex].tag, 'emotion': evt.target.value, "reason": this.tags[tagindex].tags[emindex].reason }
      }
      console.log('object', pObj);
      this.savetags.push(pObj);
    }
    this.tags[tagindex].tags[emindex].emotions[emtindex].checked = evt.target.checked;
    if (emtindex == 0) {
      this.tags[tagindex].tags[emindex].emotions[emtindex + 1].checked = false;
    } else {
      this.tags[tagindex].tags[emindex].emotions[emtindex - 1].checked = false;
    }
    console.log(this.savetags);
  }
/**
 *  Every emotion descption
 * @param data 
 * @param tagindex 
 * @param emindex 
 */
    textboxchangeAction(data, tagindex, emindex) {
    let reason = this.tags[tagindex].tags[emindex].reason;
    this.savetags.forEach(function (obj) {
      if (obj.tag == data) {
        obj.reason = reason;
      }
    })
    console.log("text box change", this.savetags)
  }
  /**
   * hiding checkbox based on the selection tags
   * @param em  emotion instance
   * @return it returns the true or false
   */
  hidingcheckbox(em) {
    em.emotions.forEach(function (obj) {
      if (obj.checked == true) {
        return false;
      }
    });
    return true;
  }
   /**
    * Saving tags for perticular review
    */
  tagsSave() {
    this.loading= true;
    const url = this.loginUrl + 'updaterev/' + this.review.review._key;
    const ignoreObj: Object = {
      'tags': this.savetags,
      'collection': this.loginRes.collection
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(this.review.review);
      });
  }
  /**
   * Adding emotion tags to the review what ever user selected
   * @param review selected review
   */
  oneditHandled(review: any) {
    this.loading= true;
    const url = this.loginUrl + "modifieddate/" + review.review._key;
    const ignoreObj: Object = {
      'collection': this.loginRes.collection,
      'tags': this.savetags
    };
    this.http.patch(url, ignoreObj)
      .subscribe((data: any) => {
        this.loading= false;
        this.getNewReviewsCountChange.emit(review.review);
      });
  }
  getreviewHeight(){
    this.reviewHeight = this.elementView.nativeElement.offsetHeight;
    console.log("this.test");
  }

}
