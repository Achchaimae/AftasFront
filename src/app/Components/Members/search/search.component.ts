import { Component, EventEmitter, Output } from '@angular/core';
import { MemberService } from 'src/app/Core/Services/member.service';
import { Member } from 'src/app/Core/model/Member.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() addMemberToCompetition = new EventEmitter<Member>();

  members: Member[] = [];
  searchTerm: string = '';

  constructor(private memberService: MemberService) {}

  onSearch() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.members = [];
      return;
    }

    this.memberService.findMember(this.searchTerm).subscribe(
      (data) => {
        console.log('Response Data:', data);
        if (data) {
          if (Array.isArray(data)) {
            this.members = data;
          } else {
            this.members = [data];
          }
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onAddMemberClick(member: Member) {
    this.addMemberToCompetition.emit(member);
  }

  onAddToCompetition(member: Member) {
    // You can emit an event to notify the parent component about the member to be added
    this.addMemberToCompetition.emit(member);

    // Display SweetAlert notification
    Swal.fire({
      title: 'Success',
      text: `${member.name} ${member.familtyName} has been added to the competition.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}
