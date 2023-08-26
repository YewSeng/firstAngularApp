import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  responseId: number = 1;
  name: string = '';
  email: string = '';
  enquiries: string = '';
  message: string = '';

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
      
  }

  addResponse() {
    const response = {
      responseId: this.responseId,
      name: this.name,
      email: this.email,
      enquiries: this.enquiries
    };

    this.http.post('http://localhost:3000/addEnquiries'
    , response).subscribe((response: any) => {
      this.message = response.message;
      window.alert('Enquiries have been successfully submitted!');
    }, (error) => {
      console.error('Error adding the enquiry', error);
    });
  }

}
