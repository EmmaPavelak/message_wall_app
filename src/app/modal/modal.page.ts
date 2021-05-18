import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UsersService } from '../users/users.service';
import jwt_decode from "jwt-decode";
import { MustMatch } from '../_helpers/must-match';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  user:any;
  tokenDecode:any;
  token= localStorage.getItem('token');
  updateForm: FormGroup;  
  submitted = false;
  id:number=0;
  
  constructor( public modalController: ModalController,private formBuilder: FormBuilder,private userService: UsersService,public toastController: ToastController) {
    
    this.user={
      id: 0,
      address: "",
      birthDate:new Date(),
      email: "",
      firstname: "",    
      lastname: "",
      password: "",
      tel: 0,
      username: ""}
      
    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]], 
      tel: [''], 
      address: ['',Validators.required], 
      birthDate: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
   }
   get f() { return this.updateForm.controls; }
  ngOnInit() {    
    if(this.token != null){
      this.tokenDecode = jwt_decode(this.token); 
      this.id=this.tokenDecode.id;
      this.userService.getUserByID(this.id).then((value) => {
        this.user = value; 
        });
    }
  }
  updateUser(){
    this.userService.updateUser(this.tokenDecode.id,this.updateForm.value).then((value) => {
      console.log(value);
      this.dismissModal();
    });
  }
  onSubmit(): void {
    this.submitted = true;
    console.log(this.updateForm.value);
    
     // stop here if form is invalid
     if (this.updateForm.invalid) {
      return;
    }
    
    this.updateUser();
    this.presentToast();
    this.submitted = true;
  
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vos modifications ont bien été prise en compte',
      duration: 3000
    });
    toast.present();
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
