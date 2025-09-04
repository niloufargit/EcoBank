import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigicodeComponent } from './digicode.component';

describe('DigicodeComponent', () => {
  let component: DigicodeComponent;
  let fixture: ComponentFixture<DigicodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigicodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigicodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
