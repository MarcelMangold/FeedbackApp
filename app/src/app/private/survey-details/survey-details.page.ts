import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/helpers/loading.service.';
import { ApiService } from 'src/app/services/api.service';
import { Categorie, CategorieDetailView } from 'src/app/models/categorie';
import { SubCategorie } from 'src/app/models/subcategorie';

@Component({
    selector: 'app-survey-details',
    templateUrl: './survey-details.page.html',
    styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage {
    isLoggedIn: boolean = false;
    surveyId: number = null;
    automaticClose:boolean = false;
    categories: Array<CategorieDetailView> = [new CategorieDetailView(-1, "test", [new SubCategorie(-1, "-1", 1)], false)];

    constructor(private activatedRoute: ActivatedRoute, private loadingService: LoadingService, private apiService: ApiService) { }

    async ionViewWillEnter() {
        this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
        this.surveyId = Number(this.activatedRoute.snapshot.paramMap.get('survey_id'));
        await this.loadingService.present('todo', "Waiting");
        await this.apiService.getSurveyDetails(this.surveyId)
            .then((res: Array<Categorie>) => {
                this.categories = [];
                res.forEach(element => {
                    this.categories.push(new CategorieDetailView(element.categorieId, element.name, element.subCategories, false));
                });
            })
            .catch(err => console.log(err));
        await this.loadingService.dismiss('todo');
    }

    toogleSection(index) {
        this.categories[index].open = !this.categories[index].open;

        for (let i = 0; i < this.categories.length; i++) {
            if (i != index)
                this.categories[i].open = false;
        }

        if (this.automaticClose && this.categories[index].open) {
            this.categories
                .filter((item, itemIndex) => itemIndex != index)
                .map(item => item.open = false)
        }

    }



}
