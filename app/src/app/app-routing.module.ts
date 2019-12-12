import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './public/rating/rating.module#RatingPageModule' },
    { path: 'admin', loadChildren: './private/admin/admin.module#AdminPageModule' },
    {
        path: 'survey_details/:survey_id',
        loadChildren: './private/survey-details/survey-details.module#SurveyDetailsPageModule'
    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
