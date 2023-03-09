import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedComponent } from './containers/detailed/detailed.component';
import { HomeComponent } from './containers/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'character/:id',
    component: DetailedComponent
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