import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export class User {
  listId: string;
  listName: string;
  tasks: any;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private USERS: User[] = [];
  listDataUrl = '/MockData/Lists.json';

  constructor(private http: HttpClient) { }

  handleError(e) {
    console.log('');
  }

  getListData() {

    //   let listData;
    // this.http.get('http://localhost:4200/assets/data.json')
    //   .pipe(map(data => {
    //     console.log('data');
    //     console.log(data);
    //     listData = data;
    //   }))
    //   .subscribe(result => {
    //     console.log('result');
    //     console.log(result);
    //   });
    // return listData;

    return this.http.get('http://localhost:4200/assets/data.json')
    .toPromise()
    .then(response => response)
    .catch(this.handleError);

    // return Observable.create(observer => {
    //   this.http.get('http://users.org').map(response => response.json());
    // });


  }
}
