import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { MessageService } from '../messages/message.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-modal-mess',
  templateUrl: './modal-mess.page.html',
  styleUrls: ['./modal-mess.page.scss'],
})
export class ModalMessPage implements OnInit {

  messages:any;

  onemessage:any;
  editMessageForm: FormGroup;  
  submitted = false;  
  tokenDecode:any;
  token= localStorage.getItem('token');
  user:any;
  @Input() idMess: number;
  
  constructor(public modalController: ModalController,private messageService: MessageService, private userService: UsersService,public toastController: ToastController,  private formBuilder: FormBuilder) { 
    this.onemessage={id:0, message:'', username:''}
    this.editMessageForm = this.formBuilder.group({
        id: ['', Validators.required],
        message: ['', Validators.required],
        username: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.getMessageById(this.idMess);
  }
  get f() { return this.editMessageForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.editMessageForm.invalid) {
      return;
    }
    this.updateMessage(this.editMessageForm.value.id,this.editMessageForm.value);
  }

  getMessageById(id: number){
    this.messageService.getMessageById(id).then((value) => {
      this.onemessage=value;
      console.log(value);
    });
  }

  updateMessage(id: number, data:any){
    this.messageService.updateMessage(id,data);
    this.dismissModal();
    this.presentToast();
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Vos modifications ont été prises en compte.',
      duration: 3000
    });
    toast.present();
  }

}
