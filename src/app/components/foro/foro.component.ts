import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [FooterComponent, NavbarComponent,MatProgressBarModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.scss'
})
export class ForoComponent {

}
