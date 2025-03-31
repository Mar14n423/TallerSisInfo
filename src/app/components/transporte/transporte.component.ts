import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss'
})
export class TransporteComponent {

}
