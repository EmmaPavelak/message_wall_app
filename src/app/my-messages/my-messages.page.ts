import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { MessageService } from '../messages/message.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.page.html',
  styleUrls: ['./my-messages.page.scss'],
})
export class MyMessagesPage implements OnInit {

  //messages:any;
  messages=[
    {
        "id": 1,
        "username": "qq",
        "message": "zzz",
        "idUser": 1,
        "sendDate": "2021-05-04T09:06:12.000Z",
        "idChannel": 2
    },
    {
        "id": 2,
        "username": "sss",
        "message": "ss",
        "idUser": 1,
        "sendDate": "2021-05-04T11:18:58.000Z",
        "idChannel": 1
    },
    {
        "id": 3,
        "username": "ss",
        "message": "zzz",
        "idUser": 1,
        "sendDate": "2021-05-04T11:55:50.000Z",
        "idChannel": null
    },
    {
        "id": 4,
        "username": "emma1997@wanadoo.fr",
        "message": "zzz",
        "idUser": 1,
        "sendDate": "2021-05-04T11:59:40.000Z",
        "idChannel": null
    },
    {
        "id": 5,
        "username": "EPavelak",
        "message": "ss",
        "idUser": 1,
        "sendDate": "2021-05-04T12:00:46.000Z",
        "idChannel": 0
    }
];
  onemessage:any;
  editMessageForm: FormGroup;  
  submitted = false;  
  tokenDecode:any;
  token= localStorage.getItem('token');
  user:any;
  
  constructor(private messageService: MessageService, private userService: UsersService, private formBuilder: FormBuilder) { 
  this.onemessage={id:0, message:'', username:''}
  this.editMessageForm = this.formBuilder.group({
      id: ['', Validators.required],
      message: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  get f() { return this.editMessageForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.editMessageForm.invalid) {
      return;
    }
    this.updateMessage(this.editMessageForm.value.id,this.editMessageForm.value);
  }

  ngOnInit(): void {
    if(this.token != null){
      this.tokenDecode = jwt_decode(this.token); 
        this.messageService.getMessageByUser(this.tokenDecode.id).then((value) => {
         // this.messages=value;
          console.log(value);
        });
      }

 
  }
  getMessageById(id: number){
    this.messageService.getMessageById(id).then((value) => {
      this.onemessage=value;
      console.log(value);
    });
  }
  
  deleteMessage(id: number){
    this.messageService.deleteMessage(id);
  }
  updateMessage(id: number, data:any){
    this.messageService.updateMessage(id,data);
  }


}
