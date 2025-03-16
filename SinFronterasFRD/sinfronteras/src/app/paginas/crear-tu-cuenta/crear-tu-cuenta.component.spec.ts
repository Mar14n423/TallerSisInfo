import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTuCuentaComponent } from './crear-tu-cuenta.component';

describe('CrearTuCuentaComponent', () => {
  let component: CrearTuCuentaComponent;
  let fixture: ComponentFixture<CrearTuCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTuCuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTuCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
