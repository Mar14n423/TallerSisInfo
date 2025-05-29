import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-marketplace-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './marketplace-admin.component.html',
  styleUrls: './marketplace-admin.component.scss'
})
export class MarketplaceAdminComponent {

}
