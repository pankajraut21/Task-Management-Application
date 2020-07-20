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
    const testdata = [
      {
        "listId": "1v6z4c2xq",
        "listName": "To Do",
        "cards": [
          {
            "id": "baghwp2pv",
            "value": "wwwwwwwwww"
          },
          {
            "id": "yyqyilcd0",
            "value": "ssssss"
          },
          {
            "id": "b44g7bpdx",
            "value": "Iron clothes"
          }
        ]
      },
      {
        "listId": "wyz0d23hz",
        "listName": "In Progress",
        "cards": [
          {
            "id": "1v6zsss4c2xq",
            "value": "Pay Electricity bill"
          },
          {
            "id": "1v6z4c2xqsss",
            "value": "Make grocery list"
          },
          {
            "id": "ajdp3vn34",
            "value": "ssssss"
          }
        ]
      },
      {
        "listId": "b44g7bpdx",
        "listName": "Done",
        "cards": [
          {
            "id": "ec47dffbx",
            "value": "Buy running shoe"
          },
          {
            "id": "kukbgxiru",
            "value": "Order drinking water bottles"
          },
          {
            "id": "bx6go8fo7",
            "value": "Pay maintenance"
          },
          {
            "id": "h5vhb697k",
            "value": "Order drinking water bottles"
          }
        ]
      }
    ];
    
    
    /*
    return this.http.get('http://localhost:4200/assets/data.json')
    .toPromise()
    .then(response => response)
    .catch(this.handleError);
    */


    
    return testdata;
    // return Observable.create(observer => {
    //   this.http.get('http://users.org').map(response => response.json());
    // });


  }
}
