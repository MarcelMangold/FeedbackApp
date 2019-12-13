import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { ApiService } from 'src/app/services/api.service';
import { Topic } from 'src/app/models/topic';

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.page.html',
    styleUrls: ['rating.page.scss']
})
export class RatingPage {
    categorieList: Array<Categorie> = [];
    currentSelectedCategorie: Categorie = new Categorie(-1,"test", []);
    actualCategorie = 0;
    topic:Topic;
    isSend:boolean= false;
    constructor(private apiService: ApiService) { }

    async ionViewWillEnter() {
        await this.apiService.getCategories()
            .then((res: Topic) => {
                this.topic = res;
                this.categorieList = this.topic.categories;
            });
     
        this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
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
