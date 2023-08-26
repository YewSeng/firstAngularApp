import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.css']
})
export class HiddenComponent implements OnInit {
  
  enteredCode: string = '';
  submittedCode: boolean = false;
  validAdmin: boolean = false;
  
  adminId: number = 1;
  name: string = '';
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
      
  }

  onValidAdmin() {
    if (this.enteredCode === 'a4bb4e0e-8414-498c-be06-ec9e65293bf5') {
      this.validAdmin = true;
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  formValidation(): boolean {
    console.log("formValidation function called!");
    const name = (<HTMLInputElement>document.getElementById('fName')).value; // Name: At least length 5
    const username = (<HTMLInputElement>document.getElementById('user')).value; // Username: At least length 8
    const password = (<HTMLInputElement>document.getElementById('password')).value; // Password: At least 1 number, 1 uppercase, 1 "@", At least length 8
  
    let nameLengthInvalid = '';
    let usernameLengthInvalid = '';
    let passwordLengthInvalid = '';
    let passwordInvalid = '';
  
    document.getElementById("nameError")!.innerHTML = '';
    document.getElementById("usernameError")!.innerHTML = '';
    document.getElementById("passwordError")!.innerHTML = '';
  
    if (name.length < 5) {
      nameLengthInvalid = "Name must contain at least 5 characters!";
      document.getElementById("nameError")!.innerHTML = nameLengthInvalid;
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
  
    const errorMessage = nameLengthInvalid + "\n" + usernameLengthInvalid + "\n" + passwordLengthInvalid + "\n" + passwordInvalid;
  
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
    this.http.get<any[]>(`http://localhost:2000/getAdmin/${this.username}`).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          window.alert('Username already exists. Please choose a different username.');
        } else {
          this.registerAdmin();
        }
      },
      (error) => {
        console.error('Error checking username existence', error);
        window.alert('Error checking username existence');
      }
    );
    }   
  }  
  
  registerAdmin() {
    const admin = {
      name: this.name,
      username: this.username,
      password: this.password,
    };
  
    this.http.post('http://localhost:2000/addAdmin', admin).subscribe(
      (response: any) => {
        this.message = response.message;
        window.alert('Admin user has been successfully created!');
      },
      (error) => {
        console.error('Error creating the admin', error);
        window.alert('Error creating the admin');
      }
    );
  }
}
