import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincompanyComponent } from './logincompany.component';

describe('LogincompanyComponent', () => {
  let component: LogincompanyComponent;
  let fixture: ComponentFixture<LogincompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogincompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


