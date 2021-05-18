import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import jwt_decode from "jwt-decode";
import { MessageService } from '../messages/message.service';
import { ModalMessPage } from '../modal-mess/modal-mess.page';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.page.html',
  styleUrls: ['./my-messages.page.scss'],
})
export class MyMessagesPage implements OnInit {

  messages:any;

  onemessage:any;
  editMessageForm: FormGroup;  
  submitted = false;  
  tokenDecode:any;
  token= localStorage.getItem('token');
  user:any;
  
  constructor(private messageService: MessageService, private userService: UsersService, private formBuilder: FormBuilder,public modalController: ModalController) { 
  }

  ngOnInit(): void {
    if(this.token != null){
      this.tokenDecode = jwt_decode(this.token); 
        this.messageService.getMessageByUser(this.tokenDecode.id).then((value) => {
          this.messages=value;
          console.log(value);
        });
      }

 
  }
  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalMessPage,
      cssClass: 'my-custom-class',
      
    componentProps: {
      'idMess': id
    }
    });
    return await modal.present();
  }

  
  deleteMessage(id: number){
    this.messageService.deleteMessage(id);
  }

}
