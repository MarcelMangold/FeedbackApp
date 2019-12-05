import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { SubCategorie } from 'src/app/models/subcategorie';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.page.html',
  styleUrls: ['rating.page.scss']
})
export class RatingPage {
  categorieList:Array<Categorie> = [];
  currentSelectedCategorie:Categorie = new Categorie("test", []);
  actualCategorie = 0;
  constructor(private apiService:apiService) { }

  ionViewWillEnter() {
    this.apiService.getCategories();
    let subCategories:Array<SubCategorie> =  [];
    subCategories.push(new SubCategorie("Optik", 1));
    subCategories.push(new SubCategorie("Konsistens", 1));
    this.categorieList.push(new Categorie("test", subCategories) )
    subCategories =  [];
    subCategories.push(new SubCategorie("Optik123", 1));
    subCategories.push(new SubCategorie("Konsistens123", 1));
    this.categorieList.push(new Categorie("test123", subCategories) )
    this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
    console.log(this.currentSelectedCategorie);

  }

  nextCategorie()
  {
    this.actualCategorie++;
    this.currentSelectedCategorie = this.categorieList[this.actualCategorie];
  }

  sendRating()
  {

  }
  
  logRatingChange()
  {
    console.log(this.currentSelectedCategorie);
  }
}
