import { SubCategorie } from "./subcategorie";

export class Categorie {
    public categorieId: number;
    public categorie: string;
    public subCategories: Array<SubCategorie>;

    constructor(categorieId:number, categorie:string, subCategories: Array<SubCategorie>) {
        this.categorieId = categorieId;
        this.categorie = categorie;
        this.subCategories = subCategories;
       
    }
}




