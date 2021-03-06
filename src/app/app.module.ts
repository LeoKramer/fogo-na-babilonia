import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AnswerSelectionComponent } from './components/answer-selection/answer-selection.component';
import { QuestionSelectionComponent } from './components/question-selection/question-selection.component';
import { BestAnswerSelectionComponent } from './components/best-answer-selection/best-answer-selection.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { UserResolver } from './components/main-menu/user.resolver'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardsService } from './services/cards.services';
import { StartGameComponent } from './components/start-game/start-game.component';
import { MatchService } from './services/match.service';
import { BestAnswerCardComponent } from './components/best-answer-card/best-answer-card.component';
import { ShowPlayerAnswersComponent } from './components/show-player-answers/show-player-answers.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerCardComponent,
    QuestionCardComponent,
    AnswerSelectionComponent,
    QuestionSelectionComponent,
    BestAnswerSelectionComponent,
    LoginComponent,
    MainMenuComponent,
    PageNotFoundComponent,
    StartGameComponent,
    BestAnswerCardComponent,
    ShowPlayerAnswersComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, CardsService, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
