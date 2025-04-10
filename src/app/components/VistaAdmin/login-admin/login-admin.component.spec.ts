import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAdminComponent } from './login-admin.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginAdminComponent, // standalone
        RouterTestingModule.withRoutes([]) // simula navegación
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar al panel si el login es correcto', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.username = 'admin';
    component.password = '1234';

    component.login();

    expect(component.loginError).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin']);
  });

  it('debería mostrar error si el login es incorrecto', () => {
    component.username = 'admin';
    component.password = 'wrong';

    component.login();

    expect(component.loginError).toBeTrue();
  });

  it('debería marcar como inválido si el usuario está vacío', () => {
    component.username = '';
    component.password = '1234';
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    expect(form.checkValidity()).toBeFalse();
  });

  it('debería marcar como inválido si la contraseña está vacía', () => {
    component.username = 'admin';
    component.password = '';
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    expect(form.checkValidity()).toBeFalse();
  });

  it('debería deshabilitar el botón si el formulario es inválido', () => {
    component.username = '';
    component.password = '';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

});
