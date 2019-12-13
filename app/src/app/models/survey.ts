export class Survey {
    public surveyId:number;
    public name: string;
    public isActive: boolean

    constructor(surveyId:number,name: string, isActive: boolean) {
        this.surveyId = surveyId;
        this.name = name;
        this.isActive = isActive
    }
}



