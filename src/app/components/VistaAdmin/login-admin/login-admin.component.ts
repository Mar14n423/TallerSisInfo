import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

//  Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
  imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
    ]
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  hidePassword = true;


  constructor(private router: Router) {}

  login() {
    const userCorrecto = 'admin';
    const passwordCorrecto = '1234';

    if (this.username === userCorrecto && this.password === passwordCorrecto) {
      this.loginError = false;
      this.router.navigate(['/admin']);
    } else {
      this.loginError = true;
    }
  }
}
