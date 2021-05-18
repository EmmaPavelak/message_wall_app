import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../users/users.service';
import { MustMatch } from '../_helpers/must-match';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerOK = true;
  registrationForm: FormGroup;
  submitted = false;

 

  ngOnInit(): void {
  }


  constructor(private localNotifications:LocalNotifications, private formBuilder: FormBuilder, private router: Router,private userService: UsersService,public toastController: ToastController) {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      tel: [''], 
      address: ['',Validators.required], 
      birthDate: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nbmess:0,
      role:"Utilisateur"
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

get f() { return this.registrationForm.controls; }

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Votre inscription a bien été prise en compte',
    duration: 3000
  });
  toast.present();
}

saveUser(){
  this.userService.createUser(this.registrationForm.value).subscribe(
    res => {
      console.log(res);
      this.presentToast();
      this.router.navigate(['home']); 
      this.registerNotification(2);
    },
    err => {
      this.registerOK = false;
      console.log('Error occured:' , err);
    }
  );

}

registerNotification(ms:number){
  this.localNotifications.schedule({
    title:"Confirmation d'inscription",
    text:"Felicitations, vous avez créer un compte sur Message Wall !"
    //trigger:
  });
}


  onSubmit(): void {
    this.submitted = true;
    
    if (this.registrationForm.invalid) {
        return;
    }
    console.warn('Your order has been submitted', this.registrationForm.value);
    this.saveUser();
  }

}
