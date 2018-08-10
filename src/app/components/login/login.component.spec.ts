import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing'
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RatingModule } from "ngx-rating";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ FormsModule, 
        ReactiveFormsModule, 
        RouterTestingModule,
        HttpModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        RatingModule,
        NgbModule
     ]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;  
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have login button text 'Login'",async(()=>{
      const button=fixture.debugElement.nativeElement;
      expect(button.querySelector('button').textContent).toBe('Login');
  }));

  it("submit equal to true after calling submit button",async(()=>{
        component.onSubmit();
        expect(component.submitted).toBeTruthy;
  }));

  it("tags object length checking after calling get tags method",async(()=>{
    component.getTags();
    expect(sessionStorage.getItem('tags')).not.toBeUndefined;
  }));

});
