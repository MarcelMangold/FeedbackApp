import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-survey-details',
    templateUrl: './survey-details.page.html',
    styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage implements OnInit {
    isLoggedIn:boolean = false;
    constructor() { }

    ngOnInit() {
        this.isLoggedIn = localStorage.getItem("isLoggedIn") =="true";

    }

}
