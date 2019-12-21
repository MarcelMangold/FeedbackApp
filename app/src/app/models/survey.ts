import { Categorie } from "./categorie";

export class Survey {
    public surveyId:number;
    public name: string;
    public isActive: boolean
    public categories:Array<Categorie>

    constructor(name:string, categories:Array<Categorie>) {
        this.surveyId = -1;
        this.name = name;
        this.isActive = false;
        this.categories = categories;
    }
}

export class SurveyDetails {
    public surveyId:number;
    public name: string;
    public isActive: boolean

    constructor(surveyId:number,name: string, isActive: boolean) {
        this.surveyId = surveyId;
        this.name = name;
        this.isActive = isActive;

    }
}




