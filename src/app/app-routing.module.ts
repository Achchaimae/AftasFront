import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionComponent } from './Components/Competitions/competition/competition.component';
import { HomeComponent } from './Components/home/home.component';
import { AddCompetitionComponent } from './Components/Competitions/add-competition/add-competition.component';
import { AddMemberComponent } from './Components/Members/add-member/add-member.component';
import { PoduimComponent } from './Components/Competitions/poduim/poduim.component';
import { AddHuntingComponent } from './Components/Competitions/add-hunting/add-hunting.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './Components/auth/register/register.component';
import { MemberComponent } from './Components/Members/member/member.component';

const routes: Routes = [
  {path : '', component : HomeComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager','Jury', 'Participant']} },
  {path : "home" , component : HomeComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager','Jury', 'Participant']}},
  {path : "competition" , component : CompetitionComponent,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager','Jury']}},
  {path : "addCompetition" , component :AddCompetitionComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager', 'Jury']}},
  {path : "addMember/:code" , component :AddMemberComponent},
  {path : "podium/:code" , component : PoduimComponent, canActivate: [AuthGuard] , data: { allowedRoles: ['Manager','Jury', 'Participant']}},
  {path : "addHunting/:code", component : AddHuntingComponent ,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager','Jury']}},
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "member",component :MemberComponent,canActivate: [AuthGuard] , data: { allowedRoles: ['Manager' ]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
