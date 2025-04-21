import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTrabajoComponent } from './detalle-trabajo.component';

describe('DetalleTrabajoComponent', () => {
  let component: DetalleTrabajoComponent;
  let fixture: ComponentFixture<DetalleTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
