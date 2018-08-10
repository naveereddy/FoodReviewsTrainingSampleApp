import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReviewServiceService } from './review-service.service';

describe('ReviewServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewServiceService],
      imports:[ 
        HttpModule,
        HttpClientModule,
     ]
    });
  });
  it('should be created', inject([ReviewServiceService], (service: ReviewServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('checking get reviews response', inject([ReviewServiceService],(service:ReviewServiceService)=>{
    service.getreviews()
    .subscribe(result => 
     expect(service.reviews.length).toBeGreaterThan(0));     
  }));

  it('checking get ignored reviews response', inject([ReviewServiceService],(service:ReviewServiceService)=>{
    service.getignorereviews('pending')
    .subscribe(result => 
     expect(service.reviews.length).toBeGreaterThan(0));     
  }));
  it('checking get reviews response', inject([ReviewServiceService],(service:ReviewServiceService)=>{
    service.gettagedreviews('ignore')
    .subscribe(result => 
     expect(service.reviews.length).toBeGreaterThan(0));     
  }));
});
