
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';


import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import {DragDropModule} from 'primeng/dragdrop';

import { AccordionModule, MenuItem } from 'primeng/primeng';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddListComponent } from './add-list/add-list.component';
import { AddCardComponent } from './add-card/add-card.component';

import { ListService } from './list.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditListComponent } from './edit-list/edit-list.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    AddListComponent,
    AddCardComponent,
    EditListComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    CardModule,
    ButtonModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    DragDropModule,
    ContextMenuModule,
    ConfirmDialogModule,

    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ ListService ],
  bootstrap: [ AppComponent ]

})

export class AppModule { }
