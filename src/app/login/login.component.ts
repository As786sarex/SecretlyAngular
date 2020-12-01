import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth-service/auth.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginFormGroup: FormGroup;
  enabled: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      loginUserName: ['', Validators.required],
      loginPassword: ['', Validators.required]
    });
    this.enabled = true;
  }

  ngOnInit() {
  }

  loginWithUsername() {
    const forward = confirm('Login to Secretly??').valueOf();
    if (forward) {
      this.enabled = false;
      const authRequest = {
        userName: this.loginFormGroup.value.loginUserName,
        password: this.loginFormGroup.value.loginPassword
      };
      this.authService.loginWithUsername(authRequest).subscribe(data => {
        console.log(data);
        if (data.status === 200) {
          const token = data.headers.get('Authorization');
          localStorage.setItem(environment.jwt_bearer_header, token);
          alert('logged in successfully');
          this.router.navigate(['/showMessages']).then(r => console.log(r));
        }
        this.enabled = true;
      }, error => {
        console.log(error);
        this.enabled = true;
      });
    }
  }

  githubClick() {
    window.alert('Github login is coming soon...');
  }

  googleClick() {
    window.alert('Google login is coming soon...');
  }
}
