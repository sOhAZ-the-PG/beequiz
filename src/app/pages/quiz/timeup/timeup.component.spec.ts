import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeupComponent } from './timeup.component';

describe('TimeupComponent', () => {
  let component: TimeupComponent;
  let fixture: ComponentFixture<TimeupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
