import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8080'
  }

  // getData(){
  //   return this.http.get('http://localhost:8080/listTeachers/');
  // }

  getData(){
    return this.http.get('/api/listTeachers')
  }
}
