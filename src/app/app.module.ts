import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, HttpHandler } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { User } from './modals/user';
import { AppComponent } from './app.component';
import { AppRoutingModule , routingComponents} from './routes/app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LoadingModule } from 'ngx-loading';
import { RatingModule } from "ngx-rating";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    LoadingModule.forRoot({
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    RatingModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],    
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
