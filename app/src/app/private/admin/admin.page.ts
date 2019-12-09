import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    isLoggedIn:boolean = false;
    userName:string = "";
    password:string = "";
    constructor() { }

    ngOnInit() {
    }

    login()
    {
        if(this.userName == "test" && this.password == "test")
            this.isLoggedIn = true;
    }

}
