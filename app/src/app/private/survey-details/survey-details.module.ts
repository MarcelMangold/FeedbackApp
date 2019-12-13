import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StarRatingModule } from 'ionic4-star-rating';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailsPage } from './survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StarRatingModule
  ],
  declarations: [SurveyDetailsPage]
})
export class SurveyDetailsPageModule {}
