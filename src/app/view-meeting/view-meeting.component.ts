import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.css']
})
export class ViewMeetingComponent  implements OnInit{

  meetings: any[] = [];
  meetingId: number = 0;
  enteredCode: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.fetchMeetings();
  }

  fetchMeetings() {
    if (this.enteredCode.trim() === '') {
      // If the enteredCode is empty, do not make a request
      this.meetings = [];
      return;
    }
    
    const partyNames = this.enteredCode.split(',').map(name => name.trim());
  
    const requests = partyNames.map(name =>
      this.http.get<any[]>('http://localhost:2000/getMeetingsByPartyName?partyName=' + name)
    );
  
    forkJoin(requests).subscribe(
      (responses: any[][]) => {
        console.log('Responses:', responses); // Add this line
        const allMeetings = responses.reduce((acc, response) => acc.concat(response), []);
        this.meetings = allMeetings;
      },
      (error) => {
        console.error('Error fetching meetings', error);
      }
    );
  }  

  deleteMeeting(meetingId: number) {
    console.log('Delete meeting function called for meeting ID:', meetingId);
  
    this.http.get('http://localhost:2000/getMeeting/' + meetingId)
      .subscribe((meetingDetails: any) => {
        console.log('Fetched meeting details:', meetingDetails);
        if (confirm('Are you sure you want to delete this meeting?')) {
          console.log('User confirmed deletion');
          this.http.delete('http://localhost:2000/deleteMeeting/' + meetingId)
            .subscribe((response: any) => {
              console.log('Meeting deleted:', response.message);
              this.message = response.message;
              this.fetchMeetings();
            }, (error) => {
              console.error('Error deleting the Meeting', error);
            });
        } else {
          console.log('User canceled deletion');
        }
      }, (error) => {
        console.error('Error fetching Meeting details', error);
      });
  }
  

}
