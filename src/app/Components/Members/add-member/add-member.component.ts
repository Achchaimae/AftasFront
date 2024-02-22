import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from 'src/app/Core/Services/competition.service';
import { MemberService } from 'src/app/Core/Services/member.service';
import { RankingService } from 'src/app/Core/Services/ranking.service';
import { Competition } from 'src/app/Core/model/Competition.model';
import { Member } from 'src/app/Core/model/Member.model';
import { RankingIdReq } from 'src/app/Core/model/RankingIdReq.model';
import { RankingReq } from 'src/app/Core/model/RankingReq.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private competitionService: CompetitionService,
    private rankingService : RankingService,
  ) {}

  competition: Competition = {
    code: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    numberOfParticipants: 0,
    location: '',
    amount: 0,
    rankings: [],
    hunting: null,
    etat: 'close'
  };
  
  members: Member[] = [];
  competitionCode!: string;
  rankingReq: RankingReq = {
    rank: 0,
    score: 0,
    id: {
      member_id: 0,
      competition_id: ''
    }
  } ;


  ngOnInit() {
    this.getData();
    this.route.params.subscribe((params) => {
      this.competitionCode = params['code'];
      this.getCompetition(this.competitionCode);
    });
  }


  getData() {
    this.memberService.getMembers().subscribe(
      data => {
      this.members = data;      
    });
  }

  getCompetition(code: string) {
    this.competitionService.findCompetition(code).subscribe(
      data => {
        this.competition = data;
      }
    );
  }
  

  saveRanking(memberId: number) {
      this.rankingReq.id.member_id= memberId,
      this.rankingReq.id.competition_id = this.competitionCode
    this.rankingService.saveRanking(this.rankingReq).subscribe((res) => {
      this.getCompetition(this.competitionCode)
      this.competition.rankings.push(res)
      Swal.fire({
        title: 'Good job!',
        text: 'The Competition saved with suceess!',
        icon: 'success'
      });
    });
  }

  findMember(attribute: any){
    this.memberService.findMember(attribute).subscribe(
      data =>{
        this.members = data
      }
    )
  }

  

 
  onAddMemberToCompetition(member: Member) {
    if (!this.isMemberInCompetition(member)) {
      this.saveRanking(member.num);
    } else {
      Swal.fire({
        title: 'Member Already in Competition',
        text: 'This member is already part of the competition.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

    isMemberInCompetition(member: Member): boolean {
    return this.competition.rankings.some((ranking) => ranking.id?.member.num === member.num);
  }

 

  delete(id:any,i:number){
    const  CompCode = this.competitionCode
    this.rankingService.deleteRank(CompCode,id).subscribe(() => {
      this.competition.rankings.splice(i,1)
      Swal.fire({
        title: 'Good job!',
        text: 'The member deleted with suceess!',
        icon: 'success'
      });
    });
    
    

  }
  
}