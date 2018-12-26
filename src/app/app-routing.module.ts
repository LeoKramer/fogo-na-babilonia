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

const routes: Routes = [
  { path: 'answers', component: AnswerSelectionComponent },
  { path: 'questions', component: QuestionSelectionComponent },
  { path: 'best-answer', component: BestAnswerSelectionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MainMenuComponent,  resolve: { data: UserResolver}},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
