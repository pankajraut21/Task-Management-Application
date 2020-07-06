import { Component, OnInit, OnChanges, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem} from 'primeng/api';
import { MessageService } from 'primeng/api';

export class Popup {
  isOpen: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MessageService ]
})
export class AppComponent implements OnInit {

  title = 'TaskList';

  listForm: FormGroup;
  submitted: boolean;


  displayModal: boolean;
  displayBasic: boolean;
  displayBasic2: boolean;
  displayMaximizable: boolean;
  position: string;

  taskList = [{
    listId: 1,
    listName: 'To Do',
    tasks: [{
        id: 1,
        value: 'Pay Electricity bill'
      }, {
        id: 2,
        value: 'Make grocery list'
      }]
  }, {
    listId: 2,
    listName: 'In Progress',
    tasks: [{
        id: 1,
        value: 'Iron clothes'
      }]
  },{
    listId: 3,
    listName: 'Done',
    tasks: [{
        id: 1,
        value: 'Buy running shoe'
      }, {
        id: 2,
        value: 'Order drinking water bottles'
      }, {
        id: 3,
        value: 'Pay maintenance'
      }, {
        id: 2,
        value: 'Order drinking water bottles'
      }, {
        id: 3,
        value: 'Pay maintenance'
      }, {
        id: 2,
        value: 'Order drinking water bottles'
      }, {
        id: 3,
        value: 'Pay maintenance'
      }, {
        id: 2,
        value: 'Order drinking water bottles'
      }, {
        id: 3,
        value: 'Pay maintenance'
      }, {
        id: 2,
        value: 'Order drinking water bottles'
      }, {
        id: 3,
        value: 'Pay maintenance'
      }]
  }];

  selectedState: any = null;
  displayPosition: boolean;

  private customerDiffer: KeyValueDiffer<string, any>;
  private customer: Popup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private differs: KeyValueDiffers) {
    this.customer = new Popup();
    this.customerDiffer = this.differs.find(this.customer).create();
  }

  customerChanged(changes: KeyValueChanges<string, any>) {
    console.log('changes');
    changes.forEachChangedItem((record) => console.log(record));
    /* If you want to see details then use
      changes.forEachRemovedItem((record) => ...);
      changes.forEachAddedItem((record) => ...);
      changes.forEachChangedItem((record) => ...);
    */
  }
  ngDoCheck(): void {
      const changes = this.customerDiffer.diff(this.customer);
      if (changes) {
        this.customerChanged(changes);
      }
  }
  ngOnInit(): void {
      this.listForm = this.fb.group({
          firstName: new FormControl('', Validators.required),
      });
    }

  addList(value: any): void {
    this.customer = {
      isOpen: false
    };
    this.displayPosition = false;
    if (this.listForm.valid) {
      this.taskList.push({
        listId: 1,
        listName: value.firstName,
        tasks: []
      });
      console.log('Form Submitted!');
      this.listForm.reset();
    }
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.listForm.value); }

  showPositionDialog(position: string) {
    this.customer = {
      isOpen: true
    };
    this.position = position;
    this.displayPosition = true;
  }
}
