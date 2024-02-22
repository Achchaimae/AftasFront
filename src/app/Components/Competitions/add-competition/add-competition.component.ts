import { Component } from '@angular/core';
import { CompetitionService } from 'src/app/Core/Services/competition.service';
import { CompetitionReq } from 'src/app/Core/model/competitionReq.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent {
  constructor(
    private competition: CompetitionService,
    private datePipe: DatePipe
  ) {}

  data: CompetitionReq = {
    code: '',
    date: new Date(),
    numberOfParticipants: 0,
    location: '',
    amount: 0,
    startTime: '',
    endTime: ''
  };

  save() {
    const locationCode = this.data.location.slice(0, 3).toLowerCase();
    const dateCode = this.datePipe.transform(this.data.date, 'dd-MM-yy');
    this.data.code = `${locationCode}-${dateCode}`;

    // Save the competition
    this.competition.saveCompetition(this.data).subscribe(() => {
      Swal.fire({
        title: 'Good job!',
        text: 'The Competition saved with suceess!',
        icon: 'success'
      });
    });
  }
}