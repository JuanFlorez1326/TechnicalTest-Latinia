import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCharactersComponent } from './components/all-characters/all-characters.component';
import { HomeComponent } from './pages/home/home.component';
import { SeeCharactersComponent } from './pages/see-characters/see-characters.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'character/:id',
    component: SeeCharactersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class MarvelRoutingModule {}