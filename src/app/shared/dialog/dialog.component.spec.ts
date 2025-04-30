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

});