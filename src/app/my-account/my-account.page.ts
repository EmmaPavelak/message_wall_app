import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { UsersService } from '../users/users.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {



  user:any;
  tokenDecode:any;
  token= localStorage.getItem('token');
  id:number=0;


  constructor(private formBuilder: FormBuilder,private userService: UsersService, public actionSheetController: ActionSheetController, public modalController: ModalController) { 
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

  }



  ngOnInit(): void {
    if(this.token != null){
      this.tokenDecode = jwt_decode(this.token); 
      this.id=this.tokenDecode.id;
      this.userService.getUserByID(this.id).then((value) => {
        this.user = value; 
        });
    }
  }


 
async presentModal() {
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'my-custom-class'
  });
  return await modal.present();
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Albums',
    cssClass: 'my-custom-class',
    buttons: [/*{
      text: 'Supprimer',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        console.log('Delete clicked');
      }
    },*/ {
      text: 'Editer',
      icon: 'pencil',
      handler: () => {
        this.presentModal() ;
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();

  const { role } = await actionSheet.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}


}
