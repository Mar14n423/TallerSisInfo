import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleoEmpresaComponent } from './empleo-empresa.component';

describe('EmpleoEmpresaComponent', () => {
  let component: EmpleoEmpresaComponent;
  let fixture: ComponentFixture<EmpleoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleoEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
