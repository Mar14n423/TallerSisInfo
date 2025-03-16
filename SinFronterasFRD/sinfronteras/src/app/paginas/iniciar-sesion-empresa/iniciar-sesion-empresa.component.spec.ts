import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionEmpresaComponent } from './iniciar-sesion-empresa.component';

describe('IniciarSesionEmpresaComponent', () => {
  let component: IniciarSesionEmpresaComponent;
  let fixture: ComponentFixture<IniciarSesionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesionEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
