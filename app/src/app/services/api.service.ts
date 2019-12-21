import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Categorie } from '../models/categorie';
import { Answer, AnswerSurvey } from '../models/answer';
import { Toast } from '../models/toast';
import { Topic } from '../models/topic';
import { User } from '../models/user';
import { Survey } from '../models/survey';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {
    }

    getCategories() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.get(environment.url + `/api/questionnaire`, { observe: 'response' })
                .toPromise()
                .then((res) => {
                    switch (res['status'] ) {
                        case 204:
                            resolve(new AnswerSurvey(false, "no active survey"));
                            break;                    
                        default:
                            resolve(new AnswerSurvey(true, res['body']));
                    }           
                })
                .catch(err => reject(err));
        })
    }

    sendRating(categories: Topic) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + "/api/questionnaire", { categories },httpOptions)
                .toPromise()
                .then((res: Answer) => {

                    resolve({ toast: new Toast("Hinzugefügt", "success", "bottom"), content: res.message });
                })
                .catch(err => reject(err));
        })
    }

    getSurveys() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.get(environment.url + `/api/surveys`, httpOptions)
                .toPromise()
                .then((res: Array<Survey>) => {
                    resolve(res);
                })
                .catch(err => reject(err));
        })
    }

    getSurveyDetails(surveyId: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.get(environment.url + `/api/survey/${surveyId}`, httpOptions)
                .toPromise()
                .then((res: Array<Categorie>) => {
                    resolve(res);
                })
                .catch(err => reject(err));
        })
    }


    setStateSurvey(survey: Survey) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.put(environment.url + "/api/stateSurvey", { survey }, httpOptions)
                .toPromise()
                .then((res: Answer) => {
                    resolve(res);
                })
                .catch(err => reject(err));
        })
    }

    login(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return new Promise((resolve, reject) => {
            this.http.post(environment.url + "/api/login", { user }, httpOptions)
                .toPromise()
                .then((res: Answer) => {
                    if (res.success)
                        resolve(true);
                    else
                        resolve(false);
                })
                .catch(err => reject(err));
        })
    }
}
