import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarvelModule } from './marvel/marvel.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CHARACTER_REDUCERS } from './marvel/state/character.state';
import { EffectsModule } from '@ngrx/effects';

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
    StoreModule.forRoot(
      CHARACTER_REDUCERS
    ),
    StoreDevtoolsModule.instrument({ 
      name: 'Marvel App' 
    }),
    EffectsModule.forRoot([])
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}