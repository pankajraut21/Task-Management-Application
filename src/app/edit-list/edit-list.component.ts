import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit, OnChanges {


  // tslint:disable-next-line:no-input-rename
  @Input() editListModal: any;
  // tslint:disable-next-line:no-output-native
  @Output() editListModalChange: EventEmitter<any> = new EventEmitter();

  cardForm: FormGroup;
  listDetailsForm: FormGroup;

  display: any;
  selectedListId: string;
  selectedListName: string;
  selectedListDetails: any;

  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.display = this.editListModal.show;
    this.selectedListId = this.editListModal.selectedListDetails.listId;
    this.selectedListName = this.editListModal.selectedListDetails.listName;
    this.selectedListDetails = this.editListModal.selectedListDetails;
    this.cardForm = this.fb.group({
        cardTitle: new FormControl('', Validators.required),
    });
    this.listDetailsForm = this.fb.group({
        listName: new FormControl(this.selectedListDetails['listName'], Validators.required),
        cards: new FormArray([])
    });
    this.onChangeTickets();
  }

  // convenience getters for easy access to form fields
  get f() { return this.listDetailsForm.controls; }
  get t() { return this.f.cards as FormArray; }

  onChangeTickets() {
    // const numberOfTickets = e.target.value || 0;
    if (this.selectedListDetails['cards'].length) {
      for (let i = 0; i < this.selectedListDetails['cards'].length; i++) {
        this.t.push(this.fb.group({
            id: [this.selectedListDetails['cards'][i].id],
            value: [this.selectedListDetails['cards'][i].value, [Validators.required]]
        }));
      }
    } else {
        // for (let i = this.t.length; i >= numberOfTickets; i--) {
        //     this.t.removeAt(i);
        // }
    }
    console.log('this.listDetailsForm');
    console.log(this.listDetailsForm.value);
}

  removeTask(cardSelected) {
    this.t.removeAt(cardSelected);
    /*
    let seletedIndex;
    for (let j = 0; j < this.selectedListDetails['cards'].length; j++) {
      if (this.selectedListDetails['cards'][j].id === cardId) {
        seletedIndex = j;
        break;
      }
    }
    this.t.removeAt(seletedIndex);
    console.log('this.listDetailsForm');
    console.log(this.listDetailsForm.value);
    */
  }

  ngOnInit(): void {
  }

  addCard(value: any): void {
    this.submitted = true;
    this.display = false;
    if (this.cardForm.valid) {
      this.hide();
    }
    this.submitted = false;
    // this.messageService.add({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  updateListDetails(listDetailsForm): void {
    console.log('this.selectedListId');
    console.log(this.selectedListId);
    this.submitted = true;
    this.display = false;
    if (this.listDetailsForm.valid) {
      this.hide();
    }
    this.submitted = false;
    /*
    this.submitted = true;
    this.display = false;
    if (this.listDetailsForm.valid) {
      this.hide();
    }
    this.submitted = false;
    */
  }

  cancelAddCard() {
    this.display = false;
    this.cardForm.reset();
  }

  hide() {
    console.log('hiding edit list...');
    const dataToOutput = {
      formData: this.submitted ? this.listDetailsForm : null,
      display: false,
      selectedListId: this.selectedListId
    };
    this.editListModalChange.emit(dataToOutput);
  }


}
