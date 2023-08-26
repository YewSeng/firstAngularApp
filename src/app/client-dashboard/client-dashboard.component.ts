import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }
  
  createMeeting() {
    this.router.navigate(['/client-create-meeting']);
  }

  viewMeeting() {
    this.router.navigate(['/client-view-meeting']);
  }


}