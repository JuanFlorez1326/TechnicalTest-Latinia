import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllCharactersComponent } from './marvel/components/all-characters/all-characters.component';
import { HomeComponent } from './marvel/pages/home/home.component';
import { SeeCharactersComponent } from './marvel/pages/see-characters/see-characters.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'character',
    component: AllCharactersComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}