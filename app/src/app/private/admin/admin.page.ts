import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { apiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    isLoggedIn:boolean = false;
    user:User = new User("","");
    constructor(private apiService:apiService) { }

    ngOnInit() {
    }

    login()
    {
        this.apiService.login(this.user).then((res: boolean) => {
            this.isLoggedIn = res;
        });
    }

}
