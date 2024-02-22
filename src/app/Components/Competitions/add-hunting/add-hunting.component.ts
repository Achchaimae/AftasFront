import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FishService } from 'src/app/Core/Services/fish.service';
import { HuntingService } from 'src/app/Core/Services/hunting.service';
import { MemberService } from 'src/app/Core/Services/member.service';
import { RankingService } from 'src/app/Core/Services/ranking.service';
import { FishReq } from 'src/app/Core/model/FishReq.model';
import { HuntingReq } from 'src/app/Core/model/HuntingReq.model';
import { Member } from 'src/app/Core/model/Member.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-hunting',
  templateUrl: './add-hunting.component.html',
  styleUrls: ['./add-hunting.component.css']
})
export class AddHuntingComponent implements OnInit {

  constructor(private huntingService: HuntingService,
     private memberService: MemberService, 
     private rankingService : RankingService,
     private fishService: FishService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFishs();
    this.route.params.subscribe((params) => {
      this.competitionCode = params['code'];
    });
    this.getMembers();
    console.log(this.competitionCode);
    
  }

  Fishes: FishReq[] = [];
  Members: Member[] = [];
  Hunting :HuntingReq ={
    numberOfFish: 0,
    fish_Id: '',
    member_Id: 0,
    competition_Id: ''
  }
  competitionCode!: string;
  getFishs() {
    this.fishService.getFishes().subscribe(
      data => {
        this.Fishes = data;
        console.log("fishes", this.Fishes);
      }
    );
  }

  getMembers() {
    this.memberService.getMembers().subscribe(
      data => {
        this.Members = data;
        console.log('members', this.Members);
      }
    );
  }

  save(){
    this.Hunting.competition_Id = this.competitionCode
    this.huntingService.savehunting(this.Hunting).subscribe(
      () => {
        Swal.fire({
          title: 'Good job!',
          text: 'You clicked the button!',
          icon: 'success'
        });
      });
  }

  saveRanks(){
    console.log("hye");
    
    this.rankingService.saveRank(this.competitionCode).subscribe();
      console.log("done");
  }

}
