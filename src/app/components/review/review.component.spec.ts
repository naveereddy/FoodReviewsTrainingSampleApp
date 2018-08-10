import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingModule } from 'ngx-loading';
import { ReviewComponent } from './review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponent ],
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
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
