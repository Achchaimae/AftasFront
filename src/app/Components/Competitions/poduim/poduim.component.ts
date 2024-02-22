import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from 'src/app/Core/Services/ranking.service';
import { Ranking } from 'src/app/Core/model/Ranking.model';

@Component({
  selector: 'app-poduim',
  templateUrl: './poduim.component.html',
  styleUrls: ['./poduim.component.css']
})
export class PoduimComponent {
  constructor(private RankingService : RankingService,private route: ActivatedRoute){}
  code!: string;
  ranking : Ranking[] =[];
  rankings : Ranking[] =[];

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.code = params['code'];
      this.getRankingByComp(this.code);
      this.getRankingByCompOrder(this.code);
    });
  }

  getRankingByComp(code:String){
    this.RankingService.getPodium(code).subscribe(
      data =>{
        this.ranking =data;

      }
    )
  }
  getRankingByCompOrder(code:String){
    this.RankingService.getRanking(code).subscribe(
      data =>{
        this.rankings =data;

      }
    )
  }

  
}
