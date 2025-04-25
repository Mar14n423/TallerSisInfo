import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecompanyComponent } from './profilecompany.component';

describe('ProfilecompanyComponent', () => {
  let component: ProfilecompanyComponent;
  let fixture: ComponentFixture<ProfilecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilecompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
