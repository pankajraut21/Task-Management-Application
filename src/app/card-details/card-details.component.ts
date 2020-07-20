import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input() cardDetailsModal: any;
  // tslint:disable-next-line:no-output-native
  @Output() cardDetailsModalChange: EventEmitter<any> = new EventEmitter();

  display: any;
  selectedListName: string;
  selectedCardDetails: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.display = this.cardDetailsModal.show;
    this.selectedListName = this.cardDetailsModal.selectedListName;
    this.selectedCardDetails = this.cardDetailsModal.selectedCardDetails;
  }

  ngOnInit(): void {
  }

  cancelAddCard() {
    this.display = false;
  }

  hide() {
    const dataToOutput = {
      display: false,
      selectedListName: undefined,
      selectedCardDetails: undefined
    };
    this.cardDetailsModalChange.emit(dataToOutput);
  }

}
