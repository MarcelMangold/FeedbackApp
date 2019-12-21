import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { ApiService } from 'src/app/services/api.service';
import { Topic } from 'src/app/models/topic';
import { AnswerSurvey } from 'src/app/models/answer';

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.page.html',
    styleUrls: ['rating.page.scss']
})
export class RatingPage {
    categorieList: Array<Categorie> = [];
    currentSelectedCategorie: Categorie = new Categorie(-1, "test", []);
    actualCategorie = 0;
    topic: Topic;
    isSend: boolean = false;
    existActiveSurvey = true;
    constructor(private apiService: ApiService) { }

    async ionViewWillEnter() {
        this.existActiveSurvey = true;
        await this.apiService.getCategories()
            .then((res: AnswerSurvey) => {
                if (res.success) {
                    this.topic = res['message'];
                    this.categorieList = this.topic.categories;
                    this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
                }
                this.existActiveSurvey = res.success;
            });
    }

    nextCategorie() {
        this.actualCategorie++;
        this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
    }

    previousCategorie() {
        this.actualCategorie--;
        this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
    }


    sendRating() {
        this.apiService.sendRating(this.topic);
        this.isSend = true;
    }

    logRatingChange() {
        console.log(this.currentSelectedCategorie);
    }
}
