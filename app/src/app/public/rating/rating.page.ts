import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { apiService } from 'src/app/services/api.service';
import { Topic } from 'src/app/models/categorie copy';

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.page.html',
    styleUrls: ['rating.page.scss']
})
export class RatingPage {
    categorieList: Array<Categorie> = [];
    currentSelectedCategorie: Categorie = new Categorie("test", []);
    actualCategorie = 0;
    topic:Topic;
    constructor(private apiService: apiService) { }

    async ionViewWillEnter() {
        await this.apiService.getCategories()
            .then((res: Topic) => {
                this.topic = res;
                this.categorieList = this.topic.categories;
            });
     
        this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
        console.log(this.currentSelectedCategorie);

    }

    nextCategorie() {
        this.actualCategorie++;
        this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
    }

    sendRating() {
        console.log(this.categorieList);
        this.apiService.sendRating(this.topic);
    }

    logRatingChange() {
        console.log(this.currentSelectedCategorie);
    }
}
