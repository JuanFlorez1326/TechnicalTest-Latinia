import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarvelModule } from './marvel/marvel.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarvelModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}