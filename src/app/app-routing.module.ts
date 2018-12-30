import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerSelectionComponent } from './components/answer-selection/answer-selection.component';
import { QuestionSelectionComponent } from './components/question-selection/question-selection.component';
import { BestAnswerSelectionComponent } from './components/best-answer-selection/best-answer-selection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { UserResolver } from './components/main-menu/user.resolver';
import { AuthGuard } from './guards/auth.guard';
import { StartGameComponent } from './components/start-game/start-game.component';
import { ShowPlayerAnswersComponent } from './components/show-player-answers/show-player-answers.component';

const routes: Routes = [
  { path: 'login',
  component: LoginComponent },
  { path: '',
    component: MainMenuComponent,
    resolve: { data: UserResolver },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: 'start',
    component: StartGameComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: 'answers',
    component: AnswerSelectionComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: 'questions',
    component: QuestionSelectionComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: 'best-answer',
    component: BestAnswerSelectionComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: 'all-answers',
    component: ShowPlayerAnswersComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: '**',
    component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
