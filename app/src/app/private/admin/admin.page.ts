import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Survey } from 'src/app/models/survey';
import { Answer } from 'src/app/models/answer';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    isLoggedIn: boolean = false;
    user: User = new User("", "");
    surveys: Array<Survey> = [];
    disableToogleButton: boolean = false;
    constructor(private apiService: ApiService) { }


    ngOnInit() {
    }

    async login() {
        await this.apiService.login(this.user).then((res: boolean) => {
            this.isLoggedIn = res;
            localStorage.setItem("isLoggedIn", this.isLoggedIn.toString())
        });
        if (this.isLoggedIn) {
            this.apiService.getSurveys().then((res: Array<Survey>) => {
                this.surveys = res;
            });
        }
    }

    createNewSurvey() {

    }

    setSurveyActive(survey: Survey) {
        console.log(survey);
        this.disableToogleButton = true;
        this.surveys.forEach(element => {
            if (element.surveyId == survey.surveyId)
                element.isActive = !survey.isActive;
            else
                element.isActive = false;
        });
        survey.isActive = !survey.isActive;
        this.apiService.setStateSurvey(survey).then((res: Answer) => {
            this.disableToogleButton = false;
        }).catch(() => this.disableToogleButton = false);

    }

}
