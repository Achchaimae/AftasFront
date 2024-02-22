import { Component } from '@angular/core';

import { MemberService } from 'src/app/Core/Services/member.service';
import { User } from 'src/app/Core/model/User.model';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  members :User[]=[];
  constructor(public memberService:MemberService){}
  ngOnInit(){
    this.getData(); 
    
    
    
    

  }
  getData() {
    this.memberService.getMembers().subscribe(
      data => {
        console.log("Data received:", data); // Log the received data
        if (Array.isArray(data)) {
          this.members = data;
        } else {
          console.error("Invalid data format:", data); // Log error for invalid data format
        }
      },
      error => {
        console.error("Error fetching members:", error); // Log any errors that occur during the request
      }
    );
  }
  deleteMember(member: User) {
    // Assuming memberService has a deleteMember method that deletes a member from the backend
    this.memberService.deleteMember(member.id).subscribe(
      () => {
        // If deletion is successful, remove the member from the local array
        this.members = this.members.filter(m => m !== member);
      },
      error => {
        console.error("Error deleting member:", error);
      }
    );
  } 
  
}
