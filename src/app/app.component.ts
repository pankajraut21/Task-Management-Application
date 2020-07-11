import { Component, OnInit, OnChanges, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem} from 'primeng/api';
import { MessageService } from 'primeng/api';

import {Message} from 'primeng//api';

import * as $ from 'jquery';

import * as data from './MockData/Lists.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ]
})
export class AppComponent implements OnInit {

  title = 'Task Management Application';

  listForm: FormGroup;
  cardForm: FormGroup;
  submitted: boolean;
  position: string;

  openAddListModal = {
    show: false,
    position: 'topright'
  };

  openAddCardModal = {
    show: false,
    selectedListId: undefined,
    selectedListName: undefined
  };

  droped = [];
  dragedColor = null;
  taskList: any = (data as any).default.data;

  constructor(private fb: FormBuilder, private messageService: MessageService, private differs: KeyValueDiffers) {
  }

  setRandomId(): string{
    const num = Math.random(); // 0.9394456857981651
    num.toString(36); // '0.xtis06h6'
    const id = num.toString(36).substr(2, 9); // 'xtis06h6'
    return id;
  }

  ngOnInit(): void {
    this.openAddListModal = {
      show: false,
      position: 'topright'
    };
    this.openAddCardModal = {
      show: false,
      selectedListId: undefined,
      selectedListName: undefined
    };
  }

  showPositionDialog(position: string) {
    this.openAddListModal.show = true;
    this.openAddListModal.position = 'topright';
  }

  openAddCardDialog(list) {
    this.openAddCardModal = {
      show: true,
      selectedListId: list.listId,
      selectedListName: list.listName
    };
  }

   dragStart(e, c, taskId) {
    this.dragedColor = c;
    this.dragedColor.listId = taskId;
   }

   dragEnd(e) {
     console.log('dragEnd e');
     console.log(e);
   }

   drop(event, sale, listId) {
     if (this.dragedColor.listId === listId) {
       return;
     }
     let setSeletedList;
     let selectedListIndex;
     if (this.dragedColor) {
       const draggedCarIndex = this.findIndex(this.dragedColor);
       sale.tasks = [...sale.tasks, this.dragedColor];
       for (let j = 0; j < this.taskList.length; j++) {
        if (this.taskList[j].listId === this.dragedColor.listId) {
          setSeletedList = this.taskList[j].tasks;
          selectedListIndex = j;
        }
      }
       this.taskList[selectedListIndex].tasks = setSeletedList.filter(
         (val, i) => i !== draggedCarIndex
       );
       this.dragedColor = null;
     }
     console.log(this.taskList);
   }

   findIndex(car) {
    let index = -1;
    let setSeletedList;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.taskList.length; j++) {
      if (this.taskList[j].listId === car.listId) {
        setSeletedList = this.taskList[j].tasks;
      }
    }

    for (let i = 0; i < setSeletedList.length; i++) {
       if (car.id === setSeletedList[i].id) {
         index = i;
         break;
       }
     }
    return index;
   }

   onClose(event) {
     console.log('event');
     console.log(event);
     if (event.formData && event.formData.value.listName) {
      this.taskList.push({
        listId: this.setRandomId(),
        listName: event.formData.value.listName,
        tasks: []
      });
     }
     this.openAddListModal = {
       show: event.display,
       position: null
     };
   }

   onCloseCardPopup(event) {
    let setSelectedListIndex;
    if (event.formData && event.formData.value.cardTitle) {
      for (let j = 0; j < this.taskList.length; j++) {
        if (this.taskList[j].listId === event.selectedListId) {
          setSelectedListIndex = j;
        }
      }
      this.taskList[setSelectedListIndex].tasks.push({
         id: this.setRandomId(),
         value: event.formData.value.cardTitle
      });
    }

    this.openAddCardModal = {
      show: event.display,
      selectedListId: undefined,
      selectedListName: undefined
    };
  }

}
