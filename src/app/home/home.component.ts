import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  username: string = '';
  password: string = '';
  userType: string = '';

  isAdmin: boolean = false;
  isClient: boolean = false;
  isUser: boolean = false;


  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
      
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  onTypeChange() {
    this.isAdmin = this.userType === 'admin';
    this.isClient = this.userType === 'client';
  }

  verifyAdmin() {
    // Send the username and password to the server to check existence and verify password
    this.http.get<any[]>(`http://localhost:2000/verifyAdmin/${this.username}/${this.password}`)
      .subscribe(
        (response: any) => {
          if (response.message === 'Admin verified') {
            console.log('Admin logged in');
            this.router.navigate(['/admin']);
          } else {
            window.alert('Invalid username or password');
          }
        },
        (error) => {
          console.error('Error verifying admin', error);
          window.alert('Error verifying admin');
        }
      );
  }
  
  

  verifyClient() {
     // Send the username and password to the server to check existence and verify password
     this.http.get<any[]>(`http://localhost:2000/verifyClient/${this.username}/${this.password}`)
     .subscribe(
       (response: any) => {
         if (response.message === 'Client verified') {
           console.log('Client logged in');
           this.router.navigate(['/client']);
         } else {
           window.alert('Invalid username or password');
         }
       },
       (error) => {
         console.error('Error verifying client', error);
         window.alert('Error verifying client');
       }
     );
  }

}
