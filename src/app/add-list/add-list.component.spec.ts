import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddListComponent } from './add-list.component';

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          ReactiveFormsModule,
          FormsModule,
      ],
      declarations: [ AddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
