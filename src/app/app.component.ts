import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import * as $ from 'jquery';
// import * as data from './MockData/Lists.json';
import { ListService } from './list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})

export class AppComponent implements OnInit {

  title = 'Task Management Application';

  // taskList: any = (data as any).default.data;
  deletePosition: any;
  taskList: any;
  cardToDelete: any;
  deleteCard: MenuItem[];
  listMenuData: MenuItem[];
  droped: any = [];
  dragedColor = null;

  addListModal = {
    show: false,
    position: 'topright'
  };

  openAddCardModal = {
    show: false,
    selectedListId: undefined,
    selectedListName: undefined
  };

  openCardDetailsModal = {
    show: false,
    selectedListName: undefined,
    selectedCardDetails: undefined
  };

  openEditListModal = {
    show: false,
    selectedListId: undefined,
    selectedListName: undefined,
    selectedListDetails: undefined,
    cards: []
  };

  constructor(
      private http: HttpClient,
      private listService: ListService,
      private confirmationService: ConfirmationService
    ) {
  }

  ngOnInit(): void {
    /*
    this.listService.getListData().then(listData => {
      this.taskList = listData;
    });
    */

   this.taskList = this.listService.getListData();

  this.addListModal = {
      show: false,
      position: 'topright'
    };

    this.openEditListModal = {
      show: false,
      selectedListId: undefined,
      selectedListName: undefined,
      selectedListDetails: undefined,
      cards: []
    };

    this.openAddCardModal = {
      show: false,
      selectedListId: undefined,
      selectedListName: undefined
    };

    this.openCardDetailsModal = {
      show: false,
      selectedListName: undefined,
      selectedCardDetails: undefined
    };

    this.deleteCard = [{
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: (event) => { this.deleteSelectedCard(this.cardToDelete); }
    }];

  }


  // List Functionality - START
  openAddListPopop(position: string) {
    this.addListModal = {
      show: true,
      position: 'topright'
    };
  }

  onCloseAddListPopop(event) {
    if (event.formData && event.formData.value.listName) {
     this.taskList.push({
       listId: this.setRandomId(),
       listName: event.formData.value.listName,
       cards: []
     });
    }
    this.addListModal = {
      show: event.display,
      position: null
    };
 }

  openEditListDialog(listDetails) {
    this.openEditListModal = {
      show: true,
      selectedListId: undefined,
      selectedListName: undefined,
      selectedListDetails: listDetails,
      cards: []
    };
  }

  onCloseEditListPopup(event) {
    let setSelectedListIndex;
    if (event.formData && event.selectedListId) {
      for (let j = 0; j < this.taskList.length; j++) {
        if (this.taskList[j].listId === event.selectedListId) {
          setSelectedListIndex = j;
        }
      }
      this.taskList[setSelectedListIndex] = event.formData.value;
      this.taskList[setSelectedListIndex].listId = event.selectedListId;
    }

    this.openEditListModal = {
      show: event.display,
      selectedListId: undefined,
      selectedListName: undefined,
      selectedListDetails: undefined,
      cards: []
    };
  }

  openConfirmListDelete(list) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this list?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deleteList(list);
          // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        },
        reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        },
        key: 'positionDialog'
    });
  }

  deleteList(list): any {
    let selectedListIndex;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.taskList.length; j++) {
      if (this.taskList[j].listId === list.listId) {
        selectedListIndex = j;
      }
    }
    this.taskList.splice(selectedListIndex, 1);
  }
  // List Functionality - END

  // Cards Functionality - START
  openAddCardDialog(list) {
    this.openAddCardModal = {
      show: true,
      selectedListId: list.listId,
      selectedListName: list.listName
    };
  }

  onCloseCardPopup(event) {
    console.log('event on add card close received');
    let setSelectedListIndex;
    if (event.formData && event.formData.value.cardTitle) {
      for (let j = 0; j < this.taskList.length; j++) {
        if (this.taskList[j].listId === event.selectedListId) {
          setSelectedListIndex = j;
        }
      }
      this.taskList[setSelectedListIndex].cards.push({
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

  openCardDetailsDialog(listName, CardDetails) {
    this.openCardDetailsModal = {
      show: true,
      selectedListName: listName,
      selectedCardDetails: CardDetails
    };
  }
  onCloseCardDetailsPopup(event) {
    console.log('event on card details close received');
    this.openCardDetailsModal = {
      show: false,
      selectedListName: undefined,
      selectedCardDetails: undefined
    };
  }


  deleteSelectedCard(event): any {
    let setSeletedList;
    let selectedListIndex;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.taskList.length; j++) {
      if (this.taskList[j].listId === event.listId) {
        setSeletedList = this.taskList[j].cards;
        selectedListIndex = j;
      }
    }

    this.taskList[selectedListIndex].cards.forEach( (item, index) => {
      if(item.id === event.cardId) {
        this.taskList[selectedListIndex].cards.splice(index, 1);
      }
    });
  }
  // Cards Functionality - END

  setRandomId(): string{
    const num = Math.random(); // 0.9394456857981651
    num.toString(36); // '0.xtis06h6'
    const id = num.toString(36).substr(2, 9); // 'xtis06h6'
    return id;
  }

  openListMenu(event, cm, list) {
    event.preventDefault();
    event.stopPropagation();
    this.prepareListMenuData(list);
    cm.show(event);
    return false;
  }

  onContextMenu(selectedListId, selectedCardId): any {
    this.cardToDelete = {
      listId: selectedListId,
      cardId: selectedCardId
    }
  }

  prepareListMenuData(list) {
    this.listMenuData = [{
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => {
          this.openEditListDialog(list);
        }
      }, {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: (event) => {
          this.openConfirmListDelete(list);
        }
    }];
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
      sale.cards = [...sale.cards, this.dragedColor];
      for (let j = 0; j < this.taskList.length; j++) {
      if (this.taskList[j].listId === this.dragedColor.listId) {
        setSeletedList = this.taskList[j].cards;
        selectedListIndex = j;
      }
    }
      this.taskList[selectedListIndex].cards = setSeletedList.filter(
        (val, i) => i !== draggedCarIndex
      );
      this.dragedColor = null;
    }
  }

  findIndex(car) {
    let index = -1;
    let setSeletedList;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.taskList.length; j++) {
      if (this.taskList[j].listId === car.listId) {
        setSeletedList = this.taskList[j].cards;
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

}
