import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
 import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { ReactiveFormsModule } from '@angular/forms';
 import { NoopAnimationsModule } from '@angular/platform-browser/animations';
 import { HarnessLoader } from '@angular/cdk/testing';
 import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
 import { MatInputHarness } from '@angular/material/input/testing';
 import { MatButtonHarness } from '@angular/material/button/testing';
 import { MatSelectHarness } from '@angular/material/select/testing';
 import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';

 describe('Pruebas unitarias del formulario (frontend)', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let loader: HarnessLoader;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [
        DialogComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: undefined } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });
  describe('Validación del formulario', () => {
    it('debería inicializar un formulario vacío cuando no hay datos', () => {
      expect(component.formEvent.value).toEqual({
        id: jasmine.any(String), 
        name: null,
        icon: null,
        date: jasmine.any(Date), 
        background: null,
        color: null
      });
    });

    it('debería marcar nombre como requerido', async () => {
      const nameInput = await loader.getHarness(MatInputHarness.with({ selector: '[formControlName="name"]' }));
      await nameInput.setValue('');
      fixture.detectChanges();
      
      expect(component.formEvent.get('name')?.hasError('required')).toBeTrue();
    });

    it('debería marcar tipo de evento como requerido', () => {
      component.formEvent.get('icon')?.setValue('');
      fixture.detectChanges();
      
      expect(component.formEvent.get('icon')?.hasError('required')).toBeTrue();
    });

    it('debería marcar fecha como requerida', async () => {
      const datePicker = await loader.getHarness(MatDatepickerInputHarness.with({ selector: '[formControlName="date"]' }));
      await datePicker.setValue('');
      fixture.detectChanges();
      
      expect(component.formEvent.get('date')?.hasError('required')).toBeTrue();
    });
  });
  describe('Comportamiento del formulario', () => {
    it('debería deshabilitar el botón Guardar cuando el formulario es inválido', async () => {
      component.formEvent.get('name')?.setValue('');
      fixture.detectChanges();
      
      const saveButton = await loader.getHarness(MatButtonHarness.with({ text: /Guardar|Agregar/ }));
      expect(await saveButton.isDisabled()).toBeTrue();
    });

    it('debería habilitar el botón Guardar cuando el formulario es válido', async () => {
      component.formEvent.patchValue({
        name: 'Evento de prueba',
        icon: 'sports_soccer',
        date: new Date()
      });
      fixture.detectChanges();
      
      const saveButton = await loader.getHarness(MatButtonHarness.with({ text: /Guardar|Agregar/ }));
      expect(await saveButton.isDisabled()).toBeFalse();
    });

    it('debería actualizar la vista previa cuando cambian los valores', async () => {
      component.formEvent.patchValue({
        name: 'Nuevo evento',
        icon: 'music_note',
        background: '#ff0000',
        color: '#ffffff'
      });
      fixture.detectChanges();
      
      const previewButton = fixture.nativeElement.querySelector('.event');
      expect(previewButton.textContent).toContain('Nuevo evento');
      expect(previewButton.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(previewButton.style.color).toBe('rgb(255, 255, 255)');
    });
  });
  describe('Interacción con los controles', () => {
    it('debería actualizar el valor del nombre al escribir en el input', async () => {
      const nameInput = await loader.getHarness(MatInputHarness.with({ selector: '[formControlName="name"]' }));
      await nameInput.setValue('Mi evento');
      
      expect(component.formEvent.value.name).toBe('Mi evento');
    });

    it('debería mostrar opciones de tipos de evento', async () => {
      const select = await loader.getHarness(MatSelectHarness.with({ selector: '[formControlName="icon"]' }));
      await select.open();
      const options = await select.getOptions();
      
      expect(options.length).toBe(component.eventType.length);
      expect(await options[0].getText()).toContain('Deporte');
    });

    it('debería actualizar el icono al seleccionar un tipo de evento', async () => {
      const select = await loader.getHarness(MatSelectHarness.with({ selector: '[formControlName="icon"]' }));
      await select.open();
      const options = await select.getOptions();
      await options[2].click(); 
      
      expect(component.formEvent.value.icon).toBe('palette');
    });
  }); 
});
