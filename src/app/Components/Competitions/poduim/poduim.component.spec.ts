import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoduimComponent } from './poduim.component';

describe('PoduimComponent', () => {
  let component: PoduimComponent;
  let fixture: ComponentFixture<PoduimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoduimComponent]
    });
    fixture = TestBed.createComponent(PoduimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
