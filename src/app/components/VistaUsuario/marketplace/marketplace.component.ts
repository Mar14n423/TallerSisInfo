import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    MatProgressBarModule,
    RouterModule // 👈 AÑADILO AQUÍ
  ],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'] //
})
export class MarketplaceComponent { }
