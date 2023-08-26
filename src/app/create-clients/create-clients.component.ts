import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.css']
})
export class CreateClientsComponent implements OnInit{

  clientName: string = '';
  email: string ='';
  address: string = '';
  postalCode: number = 0;
  username: string = '';
  password: string = '';

  message: string ='';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
      
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  formValidation(): boolean {
    console.log("formValidation function called!");
    const name = (<HTMLInputElement>document.getElementById('fName')).value; // Name: At least length 5
    const username = (<HTMLInputElement>document.getElementById('user')).value; // Username: At least length 8
    const password = (<HTMLInputElement>document.getElementById('password')).value; // Password: At least 1 number, 1 uppercase, 1 "@", At least length 8
    const email = (<HTMLInputElement>document.getElementById('email')).value; // Email: At least length 10
    const address = (<HTMLInputElement>document.getElementById('address')).value; // Address: At least length 10
    const postalCode = (<HTMLInputElement>document.getElementById('postalCode')).value; // Postal Code: Length must be 6


    let nameLengthInvalid = '';
    let usernameLengthInvalid = '';
    let passwordLengthInvalid = '';
    let passwordInvalid = '';
    let emailLengthInvalid = '';
    let emailInvalid = '';
    let addressLengthInvalid = '';
    let postalCodeLengthInvalid = '';
  
    document.getElementById("nameError")!.innerHTML = '';
    document.getElementById("usernameError")!.innerHTML = '';
    document.getElementById("passwordError")!.innerHTML = '';
    document.getElementById("emailError")!.innerHTML = '';
    document.getElementById("addressError")!.innerHTML = '';
    document.getElementById("postalCodeError")!.innerHTML = '';

  
    if (name.length < 5) {
      nameLengthInvalid = "Name must contain at least 5 characters!";
      document.getElementById("nameError")!.innerHTML = nameLengthInvalid;
    }
  
    if (email.length < 10) {
      emailLengthInvalid = "Email must contain at least 10 characters!";
      document.getElementById("emailError")!.innerHTML = emailLengthInvalid;
    }
    
    const emailRegex = /^[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      emailInvalid = "Invalid email format!";
      document.getElementById("emailError")!.innerHTML = emailInvalid;
    }

    if (address.length < 10) {
      addressLengthInvalid = "Address must contain at least 10 characters!";
      document.getElementById("addressError")!.innerHTML = addressLengthInvalid;
    }

    if (postalCode.length != 6) {
      console.log(postalCode.length);
      postalCodeLengthInvalid = "Postal Code must contain only 6 digits!";
      document.getElementById("postalCodeError")!.innerHTML = postalCodeLengthInvalid;
    }

    if (username.length < 8) {
      usernameLengthInvalid = "Username must contain at least 8 characters!";
      document.getElementById("usernameError")!.innerHTML = usernameLengthInvalid;
    }
  
    if (password.length < 8) {
      passwordLengthInvalid = "Password must contain at least 8 characters!";
      document.getElementById("passwordError")!.innerHTML = passwordLengthInvalid;
    }
  
    if (password.length >= 8 && !/(?=.*[A-Z])(?=.*\d)(?=.*@).{8,}$/.test(password)) {
      passwordInvalid = "Password should contain at least 1 Uppercase letter, 1 digit and a '@' symbol!";
      document.getElementById("passwordError")!.innerHTML = passwordInvalid;
    }

  
    const errorMessage = nameLengthInvalid + "\n" + emailLengthInvalid + "\n" + addressLengthInvalid + "\n" + postalCodeLengthInvalid + "\n" 
    + usernameLengthInvalid + "\n" + passwordLengthInvalid + "\n" + passwordInvalid;
  
    if (errorMessage.trim() !== "") {
      window.alert(errorMessage);
      return false; 
    }
  
    return true;
  }
  
  verifyRegistration() {
    if (!this.formValidation()) {
      return; // Don't proceed if form validation fails
    } else {
      // Check username existence
    this.http.get<any[]>(`http://localhost:2000/getClient/${this.username}`).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          window.alert('Username already exists. Please choose a different username.');
        } else {
          this.registerClient();
        }
      },
      (error) => {
        console.error('Error checking username existence', error);
        window.alert('Error checking username existence');
      }
    );
    }   
  }  
  
  registerClient() {
    const client = {
      clientName: this.clientName,
      email: this.email,
      address: this.address,
      postalCode: this.postalCode,
      username: this.username,
      password: this.password,
    };
  
    this.http.post('http://localhost:2000/addClient', client).subscribe(
      (response: any) => {
        this.message = response.message;
        window.alert('Client user has been successfully created!');
      },
      (error) => {
        console.error('Error creating the client', error);
        window.alert('Error creating the client');
      }
    );
  }


}