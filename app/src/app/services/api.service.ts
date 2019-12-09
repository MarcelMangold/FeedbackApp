import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Categorie } from '../models/categorie';
import { Answer } from '../models/answer';
import { Toast } from '../models/toast';
import { Topic } from '../models/categorie copy';


@Injectable({
  providedIn: 'root'
})
export class apiService {
  constructor(private http:HttpClient) {
  }

  getCategories() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return new Promise((resolve, reject) => {
      this.http.get(environment.url + `/api/questionnaire`, httpOptions)
        .toPromise()
        .then((res: Topic) => {
          resolve(res);
        })
        .catch(err => reject(err));
    })
  }

  sendRating(categories:Topic) {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return new Promise((resolve, reject) => {
        this.http.post(environment.url + "/api/questionnaire", { categories}, httpOptions)
          .toPromise()
          .then((res:Answer) => {
            resolve({toast: new Toast("Hinzugefügt", "success", "bottom"), content: res.message});
          })
          .catch(err => reject(err));
      })
  }
}
