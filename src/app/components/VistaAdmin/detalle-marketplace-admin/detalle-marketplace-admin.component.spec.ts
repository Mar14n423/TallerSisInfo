import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMarketplaceAdminComponent } from './detalle-marketplace-admin.component';

describe('DetalleMarketplaceAdminComponent', () => {
  let component: DetalleMarketplaceAdminComponent;
  let fixture: ComponentFixture<DetalleMarketplaceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMarketplaceAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMarketplaceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
