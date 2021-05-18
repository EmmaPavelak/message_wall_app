import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

 
  connectOK =true;

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private userService: UsersService, private menu: MenuController) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required] 
    });
  }
  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  login(){

  this.userService.loginUser(this.loginForm.value).then(
    () => { this.router.navigate(['home']);})  
    .then(() => {
      window.location.reload();
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }
    console.warn('Your order has been submitted', this.loginForm.value);
    this.login();   
  }

openFirst() {
  this.menu.enable(true, 'first');
  this.menu.open('first');
}

openEnd() {
  this.menu.open('end');
}

openCustom() {
  this.menu.enable(true, 'custom');
  this.menu.open('custom');
}
}
