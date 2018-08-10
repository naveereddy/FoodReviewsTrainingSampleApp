import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { LoadingModule } from 'ngx-loading';
import { ReviewComponent } from '../review/review.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          DashboardComponent,
           ReviewComponent],
      imports:[  
        LoadingModule.forRoot({
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
      }),
      NgbModule.forRoot(),
      FormsModule , 
      ReactiveFormsModule,
      HttpModule,
      HttpClientModule,
      RouterTestingModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should update pending reviews bool to true", async(()=>{
    component.pendingreviewsAction();
    expect(component.pendingreviews).toBeTruthy;
    expect(component.ignoredreviews).toBeFalsy;
    expect(component.tagedreviews).toBeFalsy;  
    spyOn(component, '_loadreviews');
  }));

  it("should update ignored reviews bool to true", async(()=>{
    component.ignoredreviewsAction();
    expect(component.pendingreviews).toBeFalsy;
    expect(component.ignoredreviews).toBeTruthy;
    expect(component.tagedreviews).toBeFalsy;  
    spyOn(component, '_loadreviews');
  }));

  it("should update taged reviews bool to true", async(()=>{
    component.tagedreviewsAction();
    expect(component.pendingreviews).toBeFalsy;
    expect(component.ignoredreviews).toBeFalsy;
    expect(component.tagedreviews).toBeTruthy;  
    spyOn(component, '_loadreviews');
  }));

  it("once newIgnoreAndTagedReviewsCount method will actionType shoudn't be genaral", async(()=>{
    let event={"actiontype":"ignore"};
    component.newIgnoreAndTagedReviewsCount(event);
    expect(component.actiontype).not.toBe("genaral");
  }));

  it("getting reviews count data from server ", async(()=>{
    component._reviewscount();
    expect(component.reviewCounts.total_reviewscount).not.toBe(0);
    expect(component.reviewCounts.ignore_reviewscount).not.toBe(0);
    expect(component.reviewCounts.taged_reviewscount).not.toBe(0);    
  }));



});
