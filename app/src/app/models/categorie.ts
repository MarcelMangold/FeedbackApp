import { SubCategorie } from "./subcategorie";

export class Categorie {
    public categorie: string;
    public subCategories: Array<SubCategorie>;

    constructor( categorie:string, subCategories: Array<SubCategorie>) {
        this.categorie = categorie;
        this.subCategories = subCategories;
       
    }
}




