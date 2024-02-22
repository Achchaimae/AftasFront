import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { login } from 'src/app/store/user.action';
import { loginInfo } from 'src/app/Core/model/loginInfo.model';
import { selectUserState } from 'src/app/store/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private store: Store, private router: Router,private authService:AuthService) {}
  info: loginInfo = {
    email: '',
    password: '',
  };
  error: String = '';
  login() {
    this.store.dispatch(login({ loginInfo: this.info }));
    setTimeout(() => {
      this.store.select(selectUserState).subscribe((res) => {
        if (res.token && res.user) {
          this.authService.setAuthInfo(res.token,res.user);
          this.router.navigate(['/home']);
        } else {
          this.error = 'email or password incorrect';
        }
      });
    }, 1000);
  }
}
