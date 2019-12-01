import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingPage } from './rating.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StarRatingModule,
    RouterModule.forChild([{ path: '', component: RatingPage }])
  ],
  declarations: [RatingPage]
})
export class RatingPageModule {}
