import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelsService } from '../channels/channels.service';
import { IMessage } from '../messages/message.models';
import { MessageService } from '../messages/message.service';
import * as moment from 'moment';
import { IonInfiniteScroll } from '@ionic/angular';
import { IChannel } from '../channels/channels.model';

@Component({
  selector: 'app-one-channel',
  templateUrl: './one-channel.page.html',
  styleUrls: ['./one-channel.page.scss'],
})
export class OneChannelPage implements OnInit,AfterViewInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  messages:any;
  channel:IChannel={
    "id": 7,
    "channelName": "La fête du slip",
    "nbMessages": "0",
    "creationDate": "2021-05-05T00:00:00.000Z",
    "statut": "Privé",
    "usersId": "1,2,4"
};
  idChannel= this.route.snapshot.params['id'];
  length = 0;
  list :any;

  constructor(private messageService: MessageService, private channelService: ChannelsService, private route: ActivatedRoute) { 
    this.channelService.getChannelById(this.idChannel).then((value:IChannel) => {
    this.channel=value;
     console.log(value);
   });
  
  } 


  ngOnInit(): void {

    

    this.messageService.getMessageByChannel(this.idChannel).then((value:IMessage[]) => {
      this.messages=value;
      for (var i = 0; i < value.length; i++) {
        const el = document.createElement('ion-item');
        el.innerHTML = `
          <ion-avatar slot="start">
            <img src="https://www.gravatar.com/avatar/${i}?d=monsterid&f=y">
          </ion-avatar>
          <ion-label>
            <h2>${value[i].username}</h2>
            <p>${value[i].message}</p>
            <p>Created ${moment(value[i].sendDate).format('D MMM YYYY')}</p>
          </ion-label>
        `;
        console.log(this.list);
        this.list.appendChild(el);
        length++;
      }
    });
   
  }

  
  ngAfterViewInit(): void {
    this.list= document.getElementById('list'); 
   // this.appendItems(this.data.length-1);
  }

  loadData(event) {
    setTimeout(async () => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      if (length < this.messages.length) {
        console.log('Loading data...');
        await this.wait(500);
        this.infiniteScroll.complete();
       // this.appendItems(10);
        console.log('Done');
      } else {
        console.log('No More Data');
        this.infiniteScroll.disabled = true;
      }
      // and disable the infinite scroll
      if (this.messages.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  wait(time) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }


}
