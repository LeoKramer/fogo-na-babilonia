import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerSelectionComponent } from './answer-selection/answer-selection.component';
import { QuestionSelectionComponent } from './question-selection/question-selection.component';
import { BestAnswerSelectionComponent } from './best-answer-selection/best-answer-selection.component';

const routes: Routes = [
  { path: 'answers', component: AnswerSelectionComponent },
  { path: 'questions', component: QuestionSelectionComponent },
  { path: 'best-answer', component: BestAnswerSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
