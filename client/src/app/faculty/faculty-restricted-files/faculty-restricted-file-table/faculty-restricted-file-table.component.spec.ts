import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRestrictedFileTableComponent } from './faculty-restricted-file-table.component';

describe('FacultyRestrictedFileTableComponent', () => {
  let component: FacultyRestrictedFileTableComponent;
  let fixture: ComponentFixture<FacultyRestrictedFileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyRestrictedFileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyRestrictedFileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
