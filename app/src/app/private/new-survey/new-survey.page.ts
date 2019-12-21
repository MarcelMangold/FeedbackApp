import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { Categorie } from 'src/app/models/categorie';
import { SubCategorie } from 'src/app/models/subcategorie';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/helpers/loading.service.';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-new-survey',
    templateUrl: './new-survey.page.html',
    styleUrls: ['./new-survey.page.scss'],
})
export class NewSurveyPage {
    isLoggedIn: boolean = false;
    survey: Survey = new Survey("survey", [new Categorie(0, "test", [new SubCategorie(0, "testSubCategorie", 5)])])
    constructor(private apiService:ApiService, private loadingService:LoadingService, private navCtrl:NavController) { }

    async ionViewWillEnter() {
        this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
    }

    addSubCategorie(indexCategorie:number) {
        this.survey.categories[indexCategorie].subCategories.push(new SubCategorie(this.survey.categories[indexCategorie].subCategories.length,"newSubCategorie",5))
    }

    addCategorie()
    {
        this.survey.categories.push(new Categorie(this.survey.categories.length, "newCategorie", [new SubCategorie(0, "newSubCategorie", 5)]))
    }

    async saveSurvey()
    {
        await this.loadingService.present('saveSurvey', "Waiting");
        await this.apiService.saveSurvey(this.survey);
        this.navCtrl.navigateBack('admin');
        await this.loadingService.dismiss('saveSurvey');
        this.survey = new Survey("survey", [new Categorie(0, "test", [new SubCategorie(0, "testSubCategorie", 5)])]);
    }

}
