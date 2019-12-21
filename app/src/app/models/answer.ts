export class Answer {
    public success: boolean;
    public message: string;
    constructor(success:boolean, message:string) {
       this.success = success;
       this.message = message;
    }
}

export class AnswerSurvey {
    public success: boolean;
    public message;
    constructor(success:boolean, message) {
       this.success = success;
       this.message = message;
    }
}



