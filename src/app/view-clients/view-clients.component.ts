import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit{

  clients: any[] = [];
  clientId: number = 0;
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.http.get('http://localhost:2000/getClients/')
    .subscribe((response: any) => {
      this.clients = response; 
    }, (error) => {
      console.error('Error fetching the clients', error);
    });
  }

  deleteProduct(clientId: number) {
    // First, fetch product details
    this.http.get('http://localhost:2000/getClient/' + clientId)
      .subscribe((clientDetails: any) => {
        if (confirm('Are you sure you want to delete this client?')) {
          this.http.delete('http://localhost:2000/deleteClient/' + clientId)
            .subscribe((response: any) => {
              this.message = response.message;
              this.fetchClients();
            }, (error) => {
              console.error('Error deleting the client', error);
            });
        }
      }, (error) => {
        console.error('Error fetching client details', error);
      });
  };
 
}
