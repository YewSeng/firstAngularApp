import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit{

  clientName: string = '';
  email: string ='';
  address: string = '';
  postalCode: number = 0;
  username: string = '';
  password: string = '';
  clientId: number = 0;

  message: string ='';

  constructor(private http: HttpClient, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('clientId');
      if (idParam !== null) {
        this.clientId =+ idParam;
        this.fetchClient();
      } else {
        console.error('ClientId is missing or null');
      }
    })
  }

  fetchClient() {
    this.http.get('http://localhost:2000/getclientById/'+this.clientId)
    .subscribe((response: any) => {
      const client = response[0];
      this.clientId = client.clientId;
      this.clientName = client.clientName;
      this.email = client.email;
      this.address = client.address;
      this.postalCode = client.postalCode;
      this.username = client.username;
    },
    (error) => {
      console.log('Error in fetching the client', error);
    });
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
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
  
  editClient() {
    if (!this.formValidation()) {
      return; // Don't proceed if form validation fails
    } else {
      // Check username existence
    this.http.get<any[]>(`http://localhost:2000/getClient/${this.username}`).subscribe(
      (response: any[]) => {
        //username can remain the same as original
        if (response.length > 1) {
          window.alert('Username already exists. Please choose a different username.');
        } else {
          this.updateClient();
          this.router.navigate(['/admin-view-clients']);
        }
      },
      (error) => {
        console.error('Error checking username existence', error);
        window.alert('Error checking username existence');
      }
    );
    }   
  }  
  
  updateClient() {
    const client = {
      clientId: this.clientId,
      clientName: this.clientName,
      email: this.email,
      address: this.address,
      postalCode: this.postalCode,
      username: this.username,
      password: this.password
    };

  
    this.http.put('http://localhost:2000/updateClient', client).subscribe(
      (response: any) => {
        this.message = response.message;
        window.alert('Client user has been successfully updated!');
      },
      (error) => {
        console.error('Error updating the client', error);
        window.alert('Error updating the client');
      }
    );
  }
}