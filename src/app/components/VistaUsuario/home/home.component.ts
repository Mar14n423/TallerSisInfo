import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TestimoniosDinamicosComponent } from '../testimoniosDinamicos/testimoniosDinamicos.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent,MatCardModule, MatInputModule, MatButtonModule, RouterLink, TestimoniosDinamicosComponent]
})
export class HomeComponent {
  showMoreText: boolean = false;

  constructor() { }

  toggleText() {
    this.showMoreText = !this.showMoreText;
  }
modoDaltonismo: boolean = false;

toggleDaltonismo(): void {
  this.modoDaltonismo = !this.modoDaltonismo;
}

}

