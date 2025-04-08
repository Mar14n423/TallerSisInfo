import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAccountComponent } from './create-company-account.component';

describe('CreateCompanyAccountComponent', () => {
  let component: CreateCompanyAccountComponent;
  let fixture: ComponentFixture<CreateCompanyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompanyAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompanyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
