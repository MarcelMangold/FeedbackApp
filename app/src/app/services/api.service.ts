import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Categorie } from '../models/categorie';


@Injectable({
  providedIn: 'root'
})
export class apiService {
  constructor(private http:HttpClient) {
  }

  getCategories() {
    console.log(environment.url + `/api/feedback`)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + `/api/feedback`, httpOptions)
        .toPromise()
        .then((res: Array<Categorie>) => {
          console.log(res);
          resolve(res);
        })
        .catch(err => reject(err));
    })
  }
}
