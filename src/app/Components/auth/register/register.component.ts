import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { User } from 'src/app/Core/model/User.model';
import { registerInfo } from 'src/app/Core/model/registreInfo.model';
import { register } from 'src/app/store/user.action';
import { selectUserState } from 'src/app/store/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private store: Store, private router: Router, private authService: AuthService) {}
  info: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    nationality: '',
    role: 'Participant',
    accessionDate: null,
    identityNumber: '',
    identityDocumentType: '',
    id: ''
  };
  error: string = '';
  
  register() {
    this.store.dispatch(register({ user: this.info }));
    setTimeout(() => {
      this.store.select(selectUserState).subscribe((res) => {
        if (res.token && res.user) {
          this.authService.setAuthInfo(res.token, res.user);
          this.router.navigate(['/home']);
        } else {
          this.error = 'Registration failed';
        }
      });
    }, 1000);
  }

}
