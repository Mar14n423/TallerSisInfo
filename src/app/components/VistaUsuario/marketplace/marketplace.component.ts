import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-marketplace',
   standalone: true,
    imports: [FooterComponent, NavbarComponent,MatProgressBarModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {

}
