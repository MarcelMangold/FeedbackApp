import { SubCategorie } from "./subcategorie";
import { Categorie } from "./categorie";

export class Topic {
    public surveyId: number;
    public categories: Array<Categorie>;

    constructor( surveyId:number, categories: Array<Categorie>) {
        this.surveyId = surveyId;
        this.categories = categories;
       
    }
}




