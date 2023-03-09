import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComicsComponent } from './components/comics/comics.component';
import { DetailedComponent } from './containers/detailed/detailed.component';
import { HomeComponent } from './containers/home/home.component';
import { MarvelRoutingModule } from './marvel-routing.module';
import { StoriesComponent } from './components/stories/stories.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TableCharactersComponent } from './components/table-characters/table-characters.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    ComicsComponent,
    StoriesComponent,
    DetailedComponent,
    HomeComponent,
    TableCharactersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MarvelRoutingModule,
    MaterialModule
  ]
})
export class MarvelModule {}