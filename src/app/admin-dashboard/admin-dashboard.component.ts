import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
      
  }

  createClient() {
    this.router.navigate(['/admin-create-clients']);
  }

  viewClient() {
    this.router.navigate(['/admin-view-clients']);
  }

  createMeeting() {
    this.router.navigate(['/admin-create-meeting']);
  }

  viewMeeting() {
    this.router.navigate(['/admin-view-meeting']);
  }


}
