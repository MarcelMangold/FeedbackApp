import { SubCategorie } from "./subcategorie";

export class Categorie {
    public categorieId: number;
    public name: string;
    public subCategories: Array<SubCategorie>;

    constructor(categorieId: number, name: string, subCategories: Array<SubCategorie>) {
        this.categorieId = categorieId;
        this.name = name;
        this.subCategories = subCategories;

    }
}

export class CategorieDetailView {
    public categorieId: number;
    public name: string;
    public subCategories: Array<SubCategorie>;
    public open: boolean;

    constructor(categorieId: number, name: string, subCategories: Array<SubCategorie>, open:boolean) {
        this.categorieId = categorieId;
        this.name = name;
        this.subCategories = subCategories;
        this.open = open;
    }
}





