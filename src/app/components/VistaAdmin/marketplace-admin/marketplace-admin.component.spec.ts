import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceAdminComponent } from './marketplace-admin.component';

describe('MarketplaceAdminComponent', () => {
  let component: MarketplaceAdminComponent;
  let fixture: ComponentFixture<MarketplaceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
