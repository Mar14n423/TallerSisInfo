import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-detalle-marketplace-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './detalle-marketplace-admin.component.html',
  styleUrl: './detalle-marketplace-admin.component.scss'
})
export class DetalleMarketplaceAdminComponent {}
