import { Component } from '@angular/core';
import { CompetitionService } from 'src/app/Core/Services/competition.service';
import { Competition } from 'src/app/Core/model/Competition.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent {
  constructor(public competitionService : CompetitionService){}
  Competition : Competition[] =[];
  page: number = 0;
  totalPages: number = 0;
  currentTime: string = '';
  selectedOption: string = 'close'; 
  currentPage: number = 1; 
  
ngOnInit(){
  this.getData(this.page); 
  this.getCurrentTime(); 
  
  
}

getButtonText(competition: Competition): string {
  const currentTime = new Date().getTime();
  const competitionTime = new Date(competition.date).getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const etat = competition.etat;



  if (competitionTime > currentTime + twentyFourHours) {
    return 'Add Member';
  } else if (competitionTime > currentTime) {
    if (etat === 'Pending') {
      console.log('Returning Add Hunting');
      return 'Add Hunting';
    }
    console.log('Returning Starting Soon');
    return 'Starting Soon';
  } else if (etat === 'Pending') {
    console.log('Returning Add Hunting');
    return 'Add Hunting';
  } else {
    console.log('Returning Podium');
    return 'Podium';
  }
}



getButton(competition:Competition)  {
  const startTime = competition.startTime;
  const endTime = competition.endTime;
  const currentTime = new Date()
  const CompetitionDate = new Date(competition.date);
}
onSelectChange() {
  this.currentPage = 0; 
  this.getDataByEtat(this.selectedOption, this.currentPage);
}


//  convertTimeStringToDate(timeString: string): Date {
//   const [hours, minutes, seconds] = timeString.split(':').map(Number);
//   const date = new Date();
//   date.setHours(hours, minutes, seconds, 0);
//   return date;
// }

getCurrentTime() {
  const now = new Date();
  const hours = this.padZero(now.getHours());
  const minutes = this.padZero(now.getMinutes());
  const seconds = this.padZero(now.getSeconds());

  this.currentTime = `${hours}:${minutes}:${seconds}`;
 
  
}

padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}



getData(page:number) {
  this.competitionService.getCompetitions(page).subscribe(
    data => {
     
      this.Competition = data.content;
      this.totalPages = data.totalPages;  
    }
  );
}


getDataByEtat(etat: any, page: number) {
  this.competitionService.getCompetitionByEtat(etat, page).subscribe(
    (data) => {
      console.log('Response from API:', data);
      this.Competition = data.content;
      this.totalPages = data.totalPages;
    },
    (error) => {
      console.error('Error from API:', error);
    }
  );
}

  nextPage()
  {
    if(this.page+2<=this.totalPages)
    {
      this.page=++this.page
      this.getData(this.page)
    } 
  }

  prevPage()
  {
    if(this.page-1>=0)
    {
      this.page = --this.page;
      this.getData(this.page)
    } 
  }
}


