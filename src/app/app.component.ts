import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  token= localStorage.getItem('token');
  constructor(private menu: MenuController,private userService: UsersService) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  
  openEnd() {
    this.menu.open('end');
  }
  
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  logout(){
    this.userService.logout();    
  }
}
