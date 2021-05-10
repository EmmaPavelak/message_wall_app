import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { ChannelsService } from '../channels/channels.service';

@Component({
  selector: 'app-my-channel',
  templateUrl: './my-channel.page.html',
  styleUrls: ['./my-channel.page.scss'],
})
export class MyChannelPage implements OnInit {


  constructor(private channelService: ChannelsService) { }

  channels=[
    {
        "id": 0,
        "channelName": "Général",
        "nbMessages": "0",
        "creationDate": "2021-05-04T00:00:00.000Z",
        "statut": "Public",
        "usersId": "1"
    },
    {
        "id": 1,
        "channelName": "La fête du slip",
        "nbMessages": "0",
        "creationDate": "2021-05-05T00:00:00.000Z",
        "statut": "Privé",
        "usersId": "1,2,4"
    }
];
  //channels:any;
  tokenDecode:any;
  token= localStorage.getItem('token');
  ngOnInit(): void {

    if(this.token != null){
      this.tokenDecode = jwt_decode(this.token); 
        this.channelService.getChannelByUser(this.tokenDecode.id).then((value) => {
        //  this.channels=value;
          console.log(value);
        });
      }

   
  }

}
