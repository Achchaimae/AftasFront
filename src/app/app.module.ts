import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionComponent } from './Components/Competitions/competition/competition.component';
import { AddCompetitionComponent } from './Components/Competitions/add-competition/add-competition.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { AddMemberComponent } from './Components/Members/add-member/add-member.component';
import { SearchComponent } from './Components/Members/search/search.component';
import { PoduimComponent } from './Components/Competitions/poduim/poduim.component';
import { AddHuntingComponent } from './Components/Competitions/add-hunting/add-hunting.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/user.effects';
import { JwtModule,JwtModuleOptions } from '@auth0/angular-jwt';
import { MemberComponent } from './Components/Members/member/member.component';

export function tokenGetter() {
  const token = getCookie('token');
  return  token != undefined ? token : null
}

export function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop(): undefined;
}
const jwtModuleOptions: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    CompetitionComponent,
    AddCompetitionComponent,
    HomeComponent,
    NavbarComponent,
    AddMemberComponent,
    SearchComponent,
    PoduimComponent,
    AddHuntingComponent,
    LoginComponent,
    RegisterComponent,
    MemberComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ userFeature: authReducer}),
    EffectsModule.forRoot(AuthEffects),
    JwtModule.forRoot(jwtModuleOptions)
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
