import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/helpers/loading.service.';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-survey-details',
    templateUrl: './survey-details.page.html',
    styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage {
    isLoggedIn:boolean = false;
    surveyId:number = null;

    constructor(private activatedRoute:ActivatedRoute, private loadingService:LoadingService, private apiService:ApiService) { }

    async ionViewWillEnter() {
        this.isLoggedIn = localStorage.getItem("isLoggedIn") =="true";
        this.surveyId = Number(this.activatedRoute.snapshot.paramMap.get('survey_id'));
        console.log("----------" + this.surveyId);
       // this.loadingService.present('todo', "Waiting");
        /* await this.todoDatbaseService.getTodos(this.todoListId)
            .then((res: Array<Todo>) => {
                res.forEach(element => {
                    this.todoList.push({ todo: element, isEdit: false });
                });

            }); */
        //    .catch( err => this.toastHelper.showToast())
      //  await this.loadingService.dismiss('todo');
    }

   

}
