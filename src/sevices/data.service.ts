import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FireModel } from '../app/models.ts/fire-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/fireData";

  constructor(private http: HttpClient) { }

  getFires() : Observable<FireModel[]>{
    return this.http.get<FireModel[]>(this.url);

  }

  addFire(fire: FireModel) : Observable<FireModel>{
    return this.http.post<FireModel>(this.url, fire);
  }

  modifyFire(fire: FireModel) : Observable<FireModel>{
    return this.http.put<FireModel>(`${this.url}/${fire.id}`, fire);
  }

  deleteFire(fire: FireModel) : Observable<FireModel>{
    return this.http.delete<FireModel>(`${this.url}/${fire.id}`);
  }

}
