import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BarchartComponent } from'./barchart/barchart.component';
import { NgbdModalContent } from './modal/modal-content';
import { NgbdModalComponent } from './modal/modal-component';

const appRoutes : Routes = [
  {path: '', component: BarchartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    NgbdModalComponent,
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    NgbdModalContent
  ]
})
export class AppModule { }
