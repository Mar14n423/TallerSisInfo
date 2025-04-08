import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

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
