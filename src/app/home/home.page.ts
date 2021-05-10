import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IMessage } from '../messages/message.models';
import { MessageService } from '../messages/message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

data = [{
  "id":0,
  "idChannel":0,
  "username": "Aline Grover",
  "message":"coucou",
  "sendDate": "November 28, 2012"
}, {
  "id":0,
  "idChannel":0,
  "username": "Aline Grover",
  "message":"coucou",
  "sendDate": "January 18, 2014"
}, {
  "id":0,
  "idChannel":0,
  "username": "Aline Grover",
  "message":"coucou",
  "sendDate": "January 18, 2014"
}];

length = 0;
list :any;
messages:any;

  constructor(private messageService: MessageService) { 
    this.messageService.getMessageByChannel(0).then((value:IMessage[]) => {
    /*  this.messages=value;
      value.forEach(element => {
        this.data.push(element);
      });    
      console.log(value.length);*/

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
    console.log(this.data.length);
   // this.appendItems(this.data.length-1);
  }

  loadData(event) {
    setTimeout(async () => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      if (length < this.data.length) {
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
      if (this.data.length == 1000) {
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
