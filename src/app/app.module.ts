import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { IndexComponent } from './index/index.component';
import { HiddenComponent } from './hidden/hidden.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { CreateClientsComponent } from './create-clients/create-clients.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { EditClientsComponent } from './edit-clients/edit-clients.component';
import { AdminCreateMeetingComponent } from './admin-create-meeting/admin-create-meeting.component';
import { AdminEditMeetingComponent } from './admin-edit-meeting/admin-edit-meeting.component';
import { AdminViewMeetingComponent } from './admin-view-meeting/admin-view-meeting.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { ViewMeetingComponent } from './view-meeting/view-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';

const routes:Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'main-frame', component: MainFrameComponent},
  {path: 'hidden', component: HiddenComponent},
  {path: 'admin', component: AdminDashboardComponent},
  {path: 'client', component: ClientDashboardComponent},
  {path: 'admin-create-clients', component: CreateClientsComponent},
  {path: 'admin-view-clients', component: ViewClientsComponent},
  {path: 'admin-edit-client/:clientId', component: EditClientsComponent},
  {path: 'admin-create-meeting', component: AdminCreateMeetingComponent},
  {path: 'admin-view-meeting', component: AdminViewMeetingComponent},
  {path: 'admin-edit-meeting/:meetingId', component: AdminEditMeetingComponent},
  {path: 'client-create-meeting', component: CreateMeetingComponent},
  {path: 'client-view-meeting', component: ViewMeetingComponent},
  {path: 'client-edit-meeting/:meetingId', component: EditMeetingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    MainFrameComponent,
    IndexComponent,
    HiddenComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    CreateClientsComponent,
    ViewClientsComponent,
    EditClientsComponent,
    AdminCreateMeetingComponent,
    AdminEditMeetingComponent,
    AdminViewMeetingComponent,
    CreateMeetingComponent,
    ViewMeetingComponent,
    EditMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
