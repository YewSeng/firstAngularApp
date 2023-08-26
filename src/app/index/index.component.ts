import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  isClientNavBarVisible = false;
  isAdminNavBarVisible = false;
  unauthorized: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update navbar visibility based on route
        this.isClientNavBarVisible = event.url.startsWith('/client');
        this.isAdminNavBarVisible = event.url.startsWith('/admin');

         // Update unauthorized based on route
         this.unauthorized = !(this.isClientNavBarVisible || this.isAdminNavBarVisible);
      }
    });
  }

  ngOnInit(): void {
      
  }

  logout() {
    this.router.navigate(['/home']);
  }
}
