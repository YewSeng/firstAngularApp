import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit-meeting',
  templateUrl: './admin-edit-meeting.component.html',
  styleUrls: ['./admin-edit-meeting.component.css']
})
export class AdminEditMeetingComponent implements OnInit  {

  meetingId: number = 0;
  topic: string = '';
  startdate: string = '';
  starttime: string = '';
  enddate: string = '';
  endtime: string = '';
  message: string = '';
  clients: any[] = [];
  selectedClients: any[] = [];


  constructor(private http: HttpClient, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.fetchClients();
    this.fetchMeeting();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('meetingId');
      if (idParam !== null) {
        this.meetingId =+ idParam;
        this.fetchMeeting();
      } else {
        console.error('MeetingId is missing or null');
      }
    })
  }

  fetchMeeting() {
    this.http.get('http://localhost:2000/getMeetingById/' + this.meetingId)
      .subscribe((response: any) => {
        console.log('Fetched meeting details:', response);
  
        if (Array.isArray(response) && response.length > 0) {
          const meeting = response[0];
  
          if (meeting) {
            this.meetingId = meeting.meetingId || 0;
            this.topic = meeting.topic || '';
  
            // Split the parties string by comma and filter out empty or TANYEWSENG entries
            const partiesArray = meeting.parties.split(',').map((client: string) => client.trim());
            this.selectedClients = partiesArray.filter((client: string) => client !== '' && client !== 'TANYEWSENG');
  
            this.startdate = meeting.startdate || '';
            this.starttime = meeting.starttime || '';
            this.enddate = meeting.enddate || '';
            this.endtime = meeting.endtime || '';
          }
        } else {
          console.error('Invalid response or empty data:', response);
        }
      }, (error) => {
        console.error('Error fetching the meeting', error);
      });
  }
  
  
  fetchClients() {
    this.http.get('http://localhost:2000/getClients')
    .subscribe((response: any) => {
      this.clients = response;
    }, (error) => {
      console.error('Error fetching the clients', error);
    });
  }

  addToMeeting(client: any) {
    const clientName = client.clientName;
  
    if (this.selectedClients.includes(clientName)) {
      // If client is already selected, remove it
      this.selectedClients = this.selectedClients.filter(selectedClient => selectedClient !== clientName);
    } else {
      // If client is not selected, add it
      this.selectedClients.push(clientName);
    }
  }

  getSelectedClientNames(): string {
    return 'TANYEWSENG, ' +this.selectedClients.join(', ');
  }

  formValidation(): boolean {
    console.log("formValidation function called!");
    const topic = (<HTMLInputElement>document.getElementById('topic')).value; // Topic: At least length 5
    const parties = (<HTMLInputElement>document.getElementById('parties')).value; // Parties: At least length 15
    const startdate = (<HTMLInputElement>document.getElementById('startdate')).value; // Startdate: cannot be null
    const starttime = (<HTMLInputElement>document.getElementById('starttime')).value; // Starttime: cannot be null
    const enddate = (<HTMLInputElement>document.getElementById('enddate')).value; // Enddate: cannot be null
    const endtime = (<HTMLInputElement>document.getElementById('endtime')).value; // Endtime: cannot be null
  
    let topicLengthInvalid = '';
    let partiesLengthInvalid = '';
    let startdateLengthInvalid = '';
    let starttimeLengthInvalid = '';
    let enddateLengthInvalid = '';
    let endtimeLengthInvalid = '';
    let enddateBeforestartdate = '';
    let endtimeBeforestarttime = '';
  
    document.getElementById("topicError")!.innerHTML = '';
    document.getElementById("partiesError")!.innerHTML = '';
    document.getElementById("startdateError")!.innerHTML = '';
    document.getElementById("starttimeError")!.innerHTML = '';
    document.getElementById("enddateError")!.innerHTML = '';
    document.getElementById("endtimeError")!.innerHTML = '';

    document.getElementById("endtimeBeforestarttime")!.innerHTML = '';
    document.getElementById("enddateBeforestartdate")!.innerHTML = '';
  
    if (topic.length < 5) {
      topicLengthInvalid = "Topic must contain at least 5 characters!";
      document.getElementById("topicError")!.innerHTML = topicLengthInvalid;
    }
  
    if (parties.length < 15) {
      partiesLengthInvalid = "Parties must contain at least 15 characters!";
      document.getElementById("partiesError")!.innerHTML = partiesLengthInvalid;
    }

    if (startdate.length == 0) {
      startdateLengthInvalid = "Meeting's starting date cannot be null!";
      document.getElementById("startdateError")!.innerHTML = startdateLengthInvalid;
    }

    if (starttime.length == 0) {
      starttimeLengthInvalid = "Meeting's starting time cannot be null!";
      document.getElementById("starttimeError")!.innerHTML = starttimeLengthInvalid;
    }

    if (enddate.length == 0) {
      enddateLengthInvalid = "Meeting's end date cannot be null!";
      document.getElementById("enddateError")!.innerHTML = enddateLengthInvalid;
    }

    if (endtime.length == 0) {
      endtimeLengthInvalid = "Meeting's end time cannot be null!";
      document.getElementById("endtimeError")!.innerHTML = endtimeLengthInvalid;
    }

    // Convert startdate and enddate strings to Date objects for comparison
    const startDateObj = new Date(this.startdate);
    const endDateObj = new Date(this.enddate);

    // Convert starttime and endtime strings to Time objects for comparison
    const startTimeObj = new Date(`1970-01-01T${this.starttime}`);
    const endTimeObj = new Date(`1970-01-01T${this.endtime}`);

    // Check if enddate is greater than or equal to startdate
    if (endDateObj < startDateObj) {
      enddateBeforestartdate = "End date must be greater than or equal to start date!"
      document.getElementById("enddateBeforestartdate")!.innerHTML = enddateBeforestartdate;
      return false;
    } 
    

    // Check if endtime is greater than starttime
    if (endTimeObj <= startTimeObj) {
      endtimeBeforestarttime = "End time must be greater than start time!"
      document.getElementById("endtimeBeforestarttime")!.innerHTML = endtimeBeforestarttime;
      return false;
    } 

    const errorMessage = topicLengthInvalid + "\n" + partiesLengthInvalid + "\n" + startdateLengthInvalid + "\n" + starttimeLengthInvalid + "\n" 
    + enddateLengthInvalid + "\n" + endtimeLengthInvalid + "\n" + enddateBeforestartdate + "\n" + endtimeBeforestarttime;
  
    if (errorMessage.trim() !== "") {
      window.alert(errorMessage);
      return false; 
    }
  
    return true;
  }

  updateMeeting() {
    if (!this.formValidation()) {
      return; // Don't proceed if form validation fails
    } else {
      const cleanedSelectedClients = ['TANYEWSENG', ...this.selectedClients.filter(client => client.trim() !== '')];
    
      const meeting = {
        meetingId: this.meetingId,
        topic: this.topic,
        parties: cleanedSelectedClients.join(', '), // Join client names into a string
        startdate: this.startdate,
        starttime: this.starttime,
        enddate: this.enddate,
        endtime: this.endtime,
      };
    
      this.http.put('http://localhost:2000/updateMeeting', meeting).subscribe(
        (response: any) => {
          this.message = response.message;
          window.alert('Meeting has been successfully updated!');
          this.router.navigate(['/admin-view-meeting']);
        },
        (error) => {
          console.error('Error updating the meeting', error);
          window.alert('Error updating the meeting');
        }
      );
    }
  }
  
  

}
