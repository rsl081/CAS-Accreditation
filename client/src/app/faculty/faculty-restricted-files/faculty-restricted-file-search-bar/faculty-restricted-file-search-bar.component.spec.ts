import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRestrictedFileSearchBarComponent } from './faculty-restricted-file-search-bar.component';

describe('FacultyRestrictedFileSearchBarComponent', () => {
  let component: FacultyRestrictedFileSearchBarComponent;
  let fixture: ComponentFixture<FacultyRestrictedFileSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyRestrictedFileSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyRestrictedFileSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
