import { SubCategorie } from "./subcategorie";
import { Categorie } from "./categorie";

export class Topic {
    public id: number;
    public categories: Array<Categorie>;

    constructor( id:number, categories: Array<Categorie>) {
        this.id = id;
        this.categories = categories;
       
    }
}




