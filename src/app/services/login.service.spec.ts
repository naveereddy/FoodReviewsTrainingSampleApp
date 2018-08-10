import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoginService } from './login.service';
import { User } from '../modals/user';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports:[ 
        HttpModule,
        HttpClientModule,
     ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
  it('checking login response', inject([LoginService],(service:LoginService)=>{
     service.loginUser({"username":"naveen","password":"thukkani"})
     .subscribe(result => 
      expect(service.loginResponse.toLocaleString).toBeGreaterThan(0));     
  }));
});
