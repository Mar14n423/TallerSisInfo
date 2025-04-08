import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, MatProgressBarModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss'
})
export class TransporteComponent {

}
