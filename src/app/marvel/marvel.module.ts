import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './pages/home/home.component';
import { SeeCharactersComponent } from './pages/see-characters/see-characters.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComicsComponent } from './components/comics/comics.component';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { MaterialModule } from '../material/material.module';
import { StoriesComponent } from './components/stories/stories.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    SearchResultsComponent,
    HomeComponent,
    SeeCharactersComponent,
    ComicsComponent,
    AllCharactersComponent,
    StoriesComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class MarvelModule {}