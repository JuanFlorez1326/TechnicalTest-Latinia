import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './containers/home/home.component';
import { SeeCharactersComponent } from './components/see-characters/see-characters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComicsComponent } from './components/comics/comics.component';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { MaterialModule } from '../shared/material/material.module';
import { StoriesComponent } from './components/stories/stories.component';
import { MarvelRoutingModule } from './marvel-routing.module';
import { DetailedComponent } from './containers/detailed/detailed.component';
import { TableCharactersComponent } from './components/table-characters/table-characters.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    SearchResultsComponent,
    HomeComponent,
    SeeCharactersComponent,
    ComicsComponent,
    AllCharactersComponent,
    StoriesComponent,
    DetailedComponent,
    TableCharactersComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    MarvelRoutingModule,
    ReactiveFormsModule,
  ]
})
export class MarvelModule {}