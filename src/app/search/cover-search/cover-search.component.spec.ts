import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSearchComponent } from './cover-search.component';

describe('CoverSearchComponent', () => {
  let component: CoverSearchComponent;
  let fixture: ComponentFixture<CoverSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
