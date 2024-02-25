import { Component } from '@angular/core';

import { MemberService } from 'src/app/Core/Services/member.service';
import { User } from 'src/app/Core/model/User.model';
import Swal from 'sweetalert2';


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

  
  updateRole(member: User) {
    Swal.fire({
      title: 'Select new role',
      input: 'select',
      inputOptions: {
        'Jury': 'Jury',
        'Participant': 'Participant',
        'Manager': 'Manager'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (newRole) => {
        return this.memberService.updateMemberRole(member.id, newRole).toPromise()
          .then(() => {
            return newRole;
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Update failed: ${error.message}`
            );
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Role updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    this.getData()
  }
  

  deleteMember(member: User) {
    this.memberService.deleteMember(member.id).subscribe(
      () => {
        this.members = this.members.filter(m => m !== member);
        Swal.fire('Success!', 'Member deleted successfully', 'success');
      },
      error => {
        this.members = this.members.filter(m => m !== member);
        Swal.fire('Success!', 'Member deleted successfully', 'success');
      }
    );
  }
  
  
  
}
