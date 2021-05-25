import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from './message.models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  
  url = 'https://back.message.btcv.fr/api/users-message';
  messages:any;

  constructor(private http: HttpClient) { }
  
  getAllMessages(){
    return new Promise((resolve, reject) => {this.http.get<Object>(`${this.url}`).subscribe( 
      res => {
        this.messages=res;   
        console.log(res);
        resolve(this.messages);
      },
      (error) => {
        reject(error);
      }
      );
    }); 
  }
  getMessageByUser(userId: number){
    return new Promise((resolve, reject) => {this.http.get<Object>(`${this.url}/username/${userId}`).subscribe( 
      res => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
      );
    }); 
  }
  getMessageByChannel(channelId: number){
    return new Promise((resolve, reject) => {this.http.get<Object>(`${this.url}/channel/${channelId}`).subscribe( 
      res => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
      );
    }); 
  }
  getMessageById(id: number){
    return new Promise((resolve, reject) => {this.http.get<Object>(`${this.url}/${id}`).subscribe( 
      res => {
        resolve(res);
      },
      (error) => {
        reject(error);
      }
      );
    }); 
  }
  addMessage(data: IMessage[]){
    return new Promise((resolve, reject) => {this.http.post(`${this.url}`,data).subscribe( 
      (res: any)=> {
        resolve(res);
      },
      (error: any) => {
        reject(error);
      }
      );
    }); 
  }
  updateMessage(id: number,data: IMessage[]){
    return new Promise((resolve, reject) => {this.http.put(`${this.url}/${id}`,data).subscribe( 
      (res: any)=> {       
        resolve(res);
      },
      (error: any) => {
        reject(error);
      }
      );
    }); 
  }
  deleteMessage(id: number){
    return new Promise((resolve, reject) => {this.http.delete(`${this.url}/${id}`).subscribe( 
      (res: any)=> {
        location.reload();
        resolve(res);
      },
      (error: any) => {
        reject(error);
      }
      );
    }); 
  }
}
