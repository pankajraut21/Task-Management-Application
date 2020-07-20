import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})

export class AddListComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input() addListModal: any;
  // tslint:disable-next-line:no-output-native
  @Output() addListModalChange: EventEmitter<any> = new EventEmitter();

  listForm: FormGroup;
  display: any;
  position: string;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.display = this.addListModal.show;
    this.position = this.addListModal.position;
    this.listForm = this.fb.group({
        listName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  addList(value: any): void {
    this.submitted = true;
    this.display = false;
    if (this.listForm.valid) {
      this.hide();
    }
    this.submitted = false;
    // this.messageService.add({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  cancelAddList() {
    this.listForm.reset();
    this.hide();
  }

  hide() {
    console.log('hiding add list...');
    const p = {
      formData: this.submitted ? this.listForm : null,
      display: false
    };
    this.addListModalChange.emit(p);
  }

}
