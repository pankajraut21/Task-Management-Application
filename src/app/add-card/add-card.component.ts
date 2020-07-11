import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})

export class AddCardComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input() openAddCardModal: any;
  // tslint:disable-next-line:no-output-native
  @Output() close: EventEmitter<any> = new EventEmitter();

  cardForm: FormGroup;

  display: any;
  selectedListId: string;
  selectedListName: string;

  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.display = this.openAddCardModal.show;
    this.selectedListId = this.openAddCardModal.selectedListId;
    this.selectedListName = this.openAddCardModal.selectedListName;
    this.cardForm = this.fb.group({
        cardTitle: new FormControl('', Validators.required),
    });
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

  cancelAddCard() {
    this.display = false;
    this.cardForm.reset();
  }

  hide() {
    const dataToOutput = {
      formData: this.submitted ? this.cardForm : null,
      display: false,
      selectedListId: this.selectedListId
    };
    this.close.emit(dataToOutput);
  }

}
