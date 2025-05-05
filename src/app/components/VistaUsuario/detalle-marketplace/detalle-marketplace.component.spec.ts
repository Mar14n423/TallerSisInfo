import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMarketplaceComponent } from './detalle-marketplace.component';

describe('DetalleMarketplaceComponent', () => {
  let component: DetalleMarketplaceComponent;
  let fixture: ComponentFixture<DetalleMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMarketplaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
