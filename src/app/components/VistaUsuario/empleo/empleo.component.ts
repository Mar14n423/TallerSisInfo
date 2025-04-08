import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-empleo',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, MatProgressBarModule ], // 🔹 Importamos Navbar y Footer
  templateUrl: './empleo.component.html',
  styleUrls: ['./empleo.component.scss']
})
export class EmpleoComponent {}
