import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionNormalComponent } from './iniciar-sesion-normal.component';

describe('IniciarSesionNormalComponent', () => {
  let component: IniciarSesionNormalComponent;
  let fixture: ComponentFixture<IniciarSesionNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionNormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
