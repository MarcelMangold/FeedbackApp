
export class SubCategorie {
    public name:string;
    public rating:number;
    public subCategorieId:number;

    constructor(subCategorieId:number, name:string, rating:number)
    {
        this.subCategorieId = subCategorieId;
        this.name = name;
        this.rating = rating;
    }  
}




