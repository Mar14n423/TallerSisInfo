import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.scss'
})
export class ForoComponent {

}
