import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  submitted = false;
  contactForm: FormGroup;


  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder, private router: Router,private contactService: ContactService, public toastController: ToastController) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

get f() { return this.contactForm.controls; }

saveContact(){
  this.contactService.createContact(this.contactForm.value).subscribe(
    res => {
      console.log(res);
      this.router.navigate(['home']);
    },
    err => {
      this.submitted = false;
      console.log('Error occured:' , err);  
    }
  );

}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Votre message a bien été envoyé.',
    duration: 3000
  });
  toast.present();
}

  onSubmit(): void {
  
    this.submitted = true;
    
    // stop here if form is invalid
      if (this.contactForm.invalid) {
        return;
    }

      console.warn('Your order has been submitted', this.contactForm.value);   
      this.presentToast();  
      this.saveContact();
  }


}
