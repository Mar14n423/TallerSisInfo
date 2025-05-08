import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // Si usas ngModel en el select
import { By } from '@angular/platform-browser';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteComponent, MatCardModule, MatSelectModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-card', () => {
    const matCard = fixture.debugElement.query(By.css('mat-card'));
    expect(matCard).toBeTruthy();
  });

  it('should render a mat-select for filtering', () => {
    const matSelect = fixture.debugElement.query(By.css('mat-select'));
    expect(matSelect).toBeTruthy();
  });
});